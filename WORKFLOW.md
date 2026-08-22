# 🔄 Protocolo de Flujo de Trabajo y Delegación entre Agentes

## 🎯 Propósito
Definir las reglas de interacción, comunicación y resolución de conflictos entre el Orquestador Central y los roles especializados (`Product Owner`, `UX/UI Engineer`, `Tech Lead`).

---

## 👥 Matriz RACI de Responsabilidades

| Fase / Tarea | Orquestador | Product Owner | UX/UI Engineer | Tech Lead |
| :--- | :---: | :---: | :---: | :---: |
| **Definición de Métricas & KPIs** | A | R | C | I |
| **Diseño de Interfaz & Componentes** | A | C | R | C |
| **Arquitectura, Hooks & Data Fetching**| A | I | C | R |
| **Sincronización en Tiempo Real (Polling)**| A | C | I | R |
| **Aprobación de Entrega (DoD)** | A | R | C | C |

- **R (Responsible):** Quien realiza el trabajo.
- **A (Accountable):** Quien aprueba y responde por el resultado (Orquestador / PO).
- **C (Consulted):** A quien se le pide retroalimentación.
- **I (Informed):** A quien se le notifica el progreso.

---

## 🚦 Protocolo de Resolución de Conflictos

1. **Conflicto Rendimiento vs. Animación Visual:**
   - Si una animación fluida interfiere con el rendimiento del polling en tiempo real, el `Tech Lead` y el `UX/UI Engineer` deben acordar el uso de virtualización de listas o renderizado por fotogramas (`requestAnimationFrame`).

2. **Estructura Incompatible en Google Sheets:**
   - Si la hoja del usuario no cumple con el formato estándar, el `Product Owner` define el mensaje de advertencia y las reglas de fallback.
