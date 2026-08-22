# ⚡ Catálogo de Habilidades y Herramientas (Skills & Tools)

## 🎯 Misión
Este documento especifica las habilidades técnicas, servicios utilitarios y funciones ejecutables que el sistema y sus agentes invocan para consultar, transformar, sincronizar y renderizar los datos provenientes de Google Sheets.

---

## 🛠️ Especificación de Habilidades Core

### 1. `fetch_google_sheet_data`
- **Descripción:** Descarga el contenido crudo desde un enlace publicado de Google Sheets (formato CSV o JSON).
- **Firma TypeScript:**
  ```typescript
  async function fetchGoogleSheetData(
    sheetUrl: string,
    options?: { format?: 'csv' | 'json'; signal?: AbortSignal }
  ): Promise<string | object>;
  ```
- **Comportamiento:**
  - Valida que la URL sea un origen seguro y corresponda a Google Sheets.
  - Convierte enlaces compartidos estándar (`/edit#gid=...`) en endpoints de exportación pública (`/pub?output=csv` o `/gviz/tq?tqx=out:json`).
  - Soporta cancelación vía `AbortSignal`.

---

### 2. `parse_and_clean_data`
- **Descripción:** Normaliza matrices crudas de texto en un array de objetos fuertemente tipados.
- **Firma TypeScript:**
  ```typescript
  function parseAndCleanData<T = Record<string, any>>(
    rawData: string | any[],
    options?: { autoInferTypes?: boolean; keyCase?: 'camelCase' | 'snakeCase' }
  ): T[];
  ```
- **Pasos de Limpieza:**
  1. Elimina filas y columnas totalmente vacías.
  2. Sanitiza nombres de encabezados (quita espacios extra, tildes, caracteres especiales).
  3. Convierte automáticamente cadenas numéricas (`"1,250.50"` -> `1250.5`) y fechas (`"2026-08-22"` -> `Date`).

---

### 3. `poll_for_updates`
- **Descripción:** Establece un ciclo recurrente en segundo plano para monitorear cambios en el origen de datos.
- **Firma TypeScript:**
  ```typescript
  function pollForUpdates(
    fetchFn: () => Promise<any>,
    onUpdate: (newData: any) => void,
    intervalMs: number
  ): () => void; // Retorna función de limpieza (stop)
  ```
- **Estrategia Resiliente:**
  - Si una petición falla, aplica backoff exponencial para evitar saturar la red.
  - Compara un hash MD5/SHA256 entre cargas previas y actuales para omitir dispatches innecesarios.

---

### 4. `trigger_ui_refresh`
- **Descripción:** Inyecta las mutaciones calculadas dentro del estado visual de la interfaz.
- **Firma TypeScript:**
  ```typescript
  function triggerUiRefresh<T>(
    prevData: T[],
    nextData: T[],
    applyDiff: (diff: { added: T[]; updated: T[]; removed: T[] }) => void
  ): void;
  ```
- **Ventaja de Rendimiento:** Evita desinstalar y reinstalar componentes React/DOM, garantizando animaciones fluidas en gráficos y tablas.
