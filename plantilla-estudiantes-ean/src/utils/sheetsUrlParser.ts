/**
 * Convierte diferentes formatos de URL de Google Sheets a una URL de exportación CSV directa.
 * 
 * Formatos soportados:
 * 1. Enlace publicado: https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv
 * 2. Enlace de visualización/compartido: https://docs.google.com/spreadsheets/d/ID_HOJA/edit#gid=0
 * 3. Enlace de vista previa: https://docs.google.com/spreadsheets/d/ID_HOJA/preview
 */
export function getGoogleSheetsCsvUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Si ya es una URL publicada en CSV directamente
  if (trimmed.includes('pub?') && trimmed.includes('output=csv')) {
    return trimmed;
  }

  // Si es una URL de Google Sheets tipo publicado sin parametro output=csv
  if (trimmed.includes('/pub') && !trimmed.includes('output=csv')) {
    return trimmed.includes('?') ? `${trimmed}&output=csv` : `${trimmed}?output=csv`;
  }

  // Extraer el Spreadsheet ID si es una URL estándar (/d/SPREADSHEET_ID)
  const match = trimmed.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const spreadsheetId = match[1];

    // Intentar extraer el gid si existe (#gid=12345 o ?gid=12345)
    const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '&gid=0';

    // Usar el endpoint de Google Visualization API que funciona muy bien con Sheets públicas
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv${gidParam}`;
  }

  // Retornar la URL original si no coincide con los patrones conocidos
  return trimmed;
}

export function isValidGoogleSheetsUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('google.com/spreadsheets');
}
