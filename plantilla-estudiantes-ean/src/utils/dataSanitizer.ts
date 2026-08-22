export interface ProcessedDataset {
  rawRows: Record<string, any>[];
  columns: string[];
  numericColumns: string[];
  dateColumn: string | null;
  categoryColumn: string | null;
  kpis: KpiItem[];
  trendData: TrendPoint[];
  categoryData: CategoryPoint[];
}

export interface KpiItem {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  changePercent: number;
  isCurrency: boolean;
  isPercentage: boolean;
}

export interface TrendPoint {
  date: string;
  [key: string]: string | number;
}

export interface CategoryPoint {
  name: string;
  value: number;
  percentage: number;
}

/**
 * Limpia y procesa el array de objetos proveniente del CSV
 */
export function sanitizeDataset(data: Record<string, any>[]): ProcessedDataset {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      rawRows: [],
      columns: [],
      numericColumns: [],
      dateColumn: null,
      categoryColumn: null,
      kpis: [],
      trendData: [],
      categoryData: [],
    };
  }

  // Sanitizar llaves y valores
  const sanitizedRows: Record<string, any>[] = [];
  const rawKeys = Object.keys(data[0] || {});
  const cleanKeysMap: Record<string, string> = {};

  rawKeys.forEach(key => {
    const cleanKey = key.trim().replace(/^[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+/, '');
    if (cleanKey) {
      cleanKeysMap[key] = cleanKey;
    }
  });

  data.forEach(row => {
    const cleanRow: Record<string, any> = {};
    let hasValue = false;

    Object.entries(row).forEach(([key, val]) => {
      const cleanKey = cleanKeysMap[key];
      if (!cleanKey) return;

      if (val !== null && val !== undefined && String(val).trim() !== '') {
        hasValue = true;
        const strVal = String(val).trim();
        cleanRow[cleanKey] = parseValue(strVal);
      } else {
        cleanRow[cleanKey] = null;
      }
    });

    if (hasValue) {
      sanitizedRows.push(cleanRow);
    }
  });

  const columns = Object.values(cleanKeysMap);

  // Clasificar columnas por tipo de dato
  const numericColumns: string[] = [];
  let dateColumn: string | null = null;
  let categoryColumn: string | null = null;

  columns.forEach(col => {
    const sampleValues = sanitizedRows.slice(0, 20).map(r => r[col]).filter(v => v !== null);
    const numCount = sampleValues.filter(v => typeof v === 'number').length;

    if (sampleValues.length > 0 && numCount / sampleValues.length > 0.6) {
      numericColumns.push(col);
    } else if (!dateColumn && col.toLowerCase().match(/(fecha|date|dia|day|mes|month|year|timestamp|tiempo)/i)) {
      dateColumn = col;
    } else if (!categoryColumn && sampleValues.some(v => typeof v === 'string')) {
      categoryColumn = col;
    }
  });

  // Si no se encontró columna de categoría explícita, usar la primera columna de tipo string
  if (!categoryColumn) {
    categoryColumn = columns.find(c => !numericColumns.includes(c) && c !== dateColumn) || columns[0] || null;
  }

  // Generar KPIs automáticamente para las columnas numéricas
  const kpis: KpiItem[] = numericColumns.slice(0, 4).map((col, index) => {
    const validValues = sanitizedRows.map(r => r[col]).filter((v): v is number => typeof v === 'number');
    const total = validValues.reduce((sum, val) => sum + val, 0);
    const avg = validValues.length > 0 ? total / validValues.length : 0;

    const isCurrency = col.toLowerCase().match(/(precio|ventas|monto|total|ingreso|costo|valor|budget|revenue|sales)/i) !== null;
    const isPercentage = col.toLowerCase().match(/(tasa|porcentaje|margin|rate|conversion|%) /i) !== null;

    // Calcular cambio porcentual ficticio o comparativo entre la primera y segunda mitad
    const half = Math.floor(validValues.length / 2);
    const firstHalfSum = validValues.slice(0, half).reduce((a, b) => a + b, 0);
    const secondHalfSum = validValues.slice(half).reduce((a, b) => a + b, 0);
    const change = firstHalfSum > 0 ? ((secondHalfSum - firstHalfSum) / firstHalfSum) * 100 : 8.5;

    const displayVal = isCurrency
      ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(total)
      : isPercentage
      ? `${avg.toFixed(1)}%`
      : total.toLocaleString('es-CO');

    return {
      id: `kpi-${index}`,
      title: col,
      value: total,
      formattedValue: displayVal,
      changePercent: Number(change.toFixed(1)),
      isCurrency,
      isPercentage,
    };
  });

  // Construir datos de tendencia temporal
  const trendData: TrendPoint[] = sanitizedRows.slice(0, 30).map((row, idx) => {
    const label = dateColumn && row[dateColumn] ? String(row[dateColumn]) : `Reg #${idx + 1}`;
    const point: TrendPoint = { date: label };
    numericColumns.forEach(col => {
      point[col] = typeof row[col] === 'number' ? row[col] : 0;
    });
    return point;
  });

  // Construir distribución por categoría
  const categoryMap: Record<string, number> = {};
  if (categoryColumn && numericColumns.length > 0) {
    const mainNumCol = numericColumns[0];
    sanitizedRows.forEach(row => {
      const cat = String(row[categoryColumn!] || 'Otros');
      const val = typeof row[mainNumCol] === 'number' ? row[mainNumCol] : 1;
      categoryMap[cat] = (categoryMap[cat] || 0) + val;
    });
  }

  const grandTotal = Object.values(categoryMap).reduce((a, b) => a + b, 0) || 1;
  const categoryData: CategoryPoint[] = Object.entries(categoryMap)
    .slice(0, 6)
    .map(([name, value]) => ({
      name,
      value,
      percentage: Number(((value / grandTotal) * 100).toFixed(1)),
    }));

  return {
    rawRows: sanitizedRows,
    columns,
    numericColumns,
    dateColumn,
    categoryColumn,
    kpis,
    trendData,
    categoryData,
  };
}

/**
 * Parsea valores individuales detectando números, porcentajes y monedas
 */
function parseValue(val: string): any {
  if (!val) return null;

  // Limpiar caracteres de moneda y espacios
  const cleanStr = val.replace(/[\$\s]/g, '').trim();

  // Si termina en %, es porcentaje
  if (cleanStr.endsWith('%')) {
    const num = parseFloat(cleanStr.replace('%', '').replace(',', '.'));
    if (!isNaN(num)) return num;
  }

  // Intentar parsear como número si contiene solo dígitos, comas y puntos
  if (/^-?\d+([.,]\d+)?$/.test(cleanStr)) {
    const normalized = cleanStr.replace(',', '.');
    const num = parseFloat(normalized);
    if (!isNaN(num)) return num;
  }

  // Si tiene formato de separador de miles con puntos o comas ej: "1,250.50" o "1.250,50"
  if (/^-?\d{1,3}([,.]\d{3})+([,.]\d+)?$/.test(cleanStr)) {
    const normalized = cleanStr.replace(/\./g, '').replace(',', '.');
    const num = parseFloat(normalized);
    if (!isNaN(num)) return num;
  }

  return val;
}
