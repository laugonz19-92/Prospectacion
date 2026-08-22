# 🎓 Plantilla Base: Sistema POS & Dashboard en Tiempo Real con Google Sheets 2026 EAN

¡Bienvenido a la plantilla oficial de desarrollo para estudiantes! Este repositorio contiene todo lo necesario para construir, personalizar y desplegar aplicaciones web conectadas a **Google Sheets** en tiempo real con inteligencia artificial.

---

## 📦 Contenido del Kit de Desarrollo

```text
.
├── README.md                   # Esta guía paso a paso
├── PROMPT.md                   # System Prompt Maestro para inicializar el agente en cualquier IA
├── SKILLS.md                   # Especificación de funciones, APIs y sanitización de datos
├── REQUIREMENTS.md             # Documento de Requerimientos (PRD) e historias de usuario
├── ARCHITECTURE.md             # Diagramas de arquitectura técnica y polling
├── WORKFLOW.md                 # Protocolo de trabajo en equipo y roles (RACI)
├── INVENTORY_TEMPLATE.md       # Plantilla de inventario lista para copiar en Google Sheets
├── package.json                # Dependencias (React 19, TypeScript, Vite, Recharts, Lucide)
├── vite.config.ts              # Configuración de Vite
├── tsconfig.json               # Configuración TypeScript
├── index.html                  # HTML5 base con Google Fonts
├── roles/                      # Definición de Roles para Prompts de IA
│   ├── ORQUESTADOR.md          # Rol Cerebro / Orquestador
│   ├── PRODUCT_OWNER.md        # Rol Product Owner
│   ├── UX_UI.md                # Rol Diseñador UX/UI
│   └── TECH_LEAD.md            # Rol Tech Lead / Desarrollador
└── src/                        # Código Fuente Completo
    ├── App.tsx                 # Componente Principal POS
    ├── main.tsx                # Entrada React DOM
    ├── index.css               # Sistema de Diseño CSS + Dark/Light Theme
    ├── types/pos.ts            # Interfaces TypeScript
    ├── hooks/useSheetsData.ts  # Custom Hook de sincronización en tiempo real
    ├── utils/                  # Funciones de parseo, limpiador y data de muestra
    └── components/             # Componentes de Caja, Catálogo, Carrito y Recibos
```

---

## 🚀 Guía de Inicio para Estudiantes

### 1. Requisitos Previos
Asegúrate de tener instalado en tu computadora:
- **Node.js** (Versión 18 o superior). Puedes descargarlo gratis desde [nodejs.org](https://nodejs.org).

### 2. Instalación y Ejecución Local
Abre tu terminal en la carpeta del proyecto y ejecuta los siguientes comandos:

```bash
# 1. Instalar dependencias del proyecto
npm install

# 2. Iniciar el servidor de desarrollo local
npm run dev
```

Abre tu navegador en **`http://localhost:3000`** para ver tu aplicación funcionando.

---

## 📊 Cómo Conectar tu Propia Hoja de Google Sheets

1. Abre tu hoja en [Google Sheets](https://sheets.google.com).
2. Abre el archivo [`INVENTORY_TEMPLATE.md`](./INVENTORY_TEMPLATE.md), copia la tabla de ejemplo y pégala en la celda `A1` de tu hoja.
3. Ve a **Archivo ➔ Compartir ➔ Publicar en la web**.
4. En el desplegable, selecciona formato **Valores separados por comas (.csv)** y haz clic en **Publicar**.
5. Copia el enlace generado y pégalo en el campo superior de tu aplicación web.

---

## 🤖 Cómo Usar los Prompts con Inteligencia Artificial

Si estás utilizando asistentes de IA (como ChatGPT, Claude o Antigravity):
1. Copia el contenido del archivo [`PROMPT.md`](./PROMPT.md) y pásalo como mensaje inicial.
2. Consulta [`roles/`](./roles/) para pedir a la IA que asuma responsabilidades específicas (`TECH_LEAD.md` para código, `UX_UI.md` para interfaz, `PRODUCT_OWNER.md` para requerimientos).
