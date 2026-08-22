import React from 'react';
import { BookOpen, CheckCircle, Terminal, Key, Globe, Database, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectionGuideModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/40 rounded-xl flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Guía Paso a Paso de Conexiones & Vercel</h2>
              <p className="text-xs text-slate-400">Instrucciones completas para conectar las API Keys, desplegar en Vercel y sincronizar datos.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-lg px-2"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs text-slate-300 max-h-[70vh] overflow-y-auto pr-2">
          
          {/* Paso 1: API Keys */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
              <Key className="w-4 h-4 text-indigo-400" />
              <span>Paso 1: Obtener y Configurar API Keys de IA</span>
            </div>
            <p className="text-slate-300">
              El Agente 1 utiliza modelos de lenguaje (OpenAI GPT-4o / Gemini) para estructurar datos no estructurados de curadurías y prensa.
            </p>
            <ul className="space-y-2 text-slate-300 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>OpenAI API Key:</strong> Regístrate en <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="text-indigo-400 underline">platform.openai.com/api-keys</a> y crea una clave secreta.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Google Gemini API Key:</strong> Obtén tu API Key gratuita en <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-400 underline">aistudio.google.com</a>.
                </div>
              </li>
            </ul>
          </div>

          {/* Paso 2: Subir a GitHub */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Paso 2: Subir el Código a GitHub</span>
            </div>
            <p className="text-slate-300">Ejecuta los siguientes comandos en tu terminal de comandos (PowerShell / Bash):</p>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg font-mono text-[11px] text-indigo-300 space-y-1">
              <div>git init</div>
              <div>git add .</div>
              <div>git commit -m "Sistema 2 Agentes IA Prospección Educativa"</div>
              <div>git branch -M main</div>
              <div>git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git</div>
              <div>git push -u origin main</div>
            </div>
          </div>

          {/* Paso 3: Despliegue en Vercel */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Paso 3: Desplegar en Vercel</span>
            </div>
            <ol className="list-decimal pl-4 space-y-2 text-slate-300">
              <li>Ingresa a <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-indigo-400 underline">vercel.com/new</a> con tu cuenta de GitHub.</li>
              <li>Selecciona e importa el repositorio que acabas de subir.</li>
              <li>En la sección <strong>Environment Variables</strong>, agrega:
                <div className="bg-slate-900 border border-slate-800 p-2 rounded font-mono text-[11px] text-emerald-400 mt-1.5 space-y-1">
                  <div>OPENAI_API_KEY = tu_clave_de_openai</div>
                  <div>GEMINI_API_KEY = tu_clave_de_gemini</div>
                </div>
              </li>
              <li>Haz clic en <strong>Deploy</strong>. Vercel compilará la aplicación y creará los endpoints Serverless en <code className="text-indigo-300 font-mono">/api/agent-search</code> y <code className="text-indigo-300 font-mono">/api/agent-inventory</code>.</li>
            </ol>
          </div>

          {/* Paso 4: Google Sheets / Supabase */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
              <Database className="w-4 h-4 text-amber-400" />
              <span>Paso 4: Conexión con Google Sheets / Base de Datos</span>
            </div>
            <p className="text-slate-300">
              Puedes sincronizar el inventario del Agente 2 directamente exportando el archivo CSV o conectándolo con una hoja de cálculo pública de Google Sheets:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-slate-300">
              <li>Haz clic en <strong>"Exportar Inventario CSV"</strong> en la pestaña del Agente 2.</li>
              <li>En Google Sheets: Ve a <strong>Archivo -&gt; Importar -&gt; Cargar</strong> y selecciona el archivo descargado.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Entendido, Cerrar Guía
          </button>
        </div>

      </div>
    </div>
  );
};
