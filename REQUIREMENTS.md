# 📑 Especificación de Requerimientos y Producto (PRD)

## 🎯 Visión General del Producto
El **Sheets Real-Time Dashboard** es un sistema analítico web diseñado para transformar hojas de cálculo públicas de Google Sheets en dashboards interactivos ejecutivos. Permite a los usuarios visualizar indicadores en tiempo real sin infraestructura compleja ni configuraciones pesadas de backend.

---

## 🚀 Requerimientos Funcionales (RF)

### RF-01: Configuración y Conexión
- **RF-01.1:** El usuario debe poder ingresar una URL de Google Sheets en la interfaz.
- **RF-01.2:** El sistema debe extraer automáticamente las pestañas disponibles en la hoja de cálculo.
- **RF-01.3:** Se debe permitir la configuración del intervalo de refresco (desde 3 segundos hasta 1 minuto).

### RF-02: Procesamiento y Limpieza de Datos
- **RF-02.1:** Detección automática de encabezados en la primera fila no vacía.
- **RF-02.2:** Formateo automático de tipos: Monedas, Porcentajes, Enteros, Decimales, Fechas y Cadenas.
- **RF-02.3:** Tolerancia a filas con valores faltantes (`null`/`blank`) reemplazándolos con valores por defecto contextuales.

### RF-03: Visualización Analítica
- **RF-03.1 (Tarjetas KPI):** Cálculo automático de totales, promedios y cambios porcentuales respecto al registro anterior.
- **RF-03.2 (Gráficos Dinámicos):** Gráficos de tendencias temporales (Líneas/Áreas) y distribución categórica (Barras/Donas).
- **RF-03.3 (Tabla de Datos):** Filtro multi-columna, ordenamiento ascendente/descendente y paginación client-side.

---

## ⚡ Requerimientos No Funcionales (RNF)

- **RNF-01 (Rendimiento):** Tiempo de renderizado inicial inferior a 1.5 segundos.
- **RNF-02 (Sincronización):** Consumo de memoria estable (sin fugas en ciclos prolongados de polling).
- **RNF-03 (Responsividad):** Adaptación completa a pantallas de escritorio (1920px), laptops (1366px) y dispositivos móviles (375px+).
- **RNF-04 (Usabilidad):** Indicación clara en todo momento sobre la frescura de los datos ("Última actualización: Hace 4 segundos").
