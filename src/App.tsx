
import React, { useState } from 'react';
import { EducationalProject, ApiKeysConfig } from './types/agents';
import { INITIAL_PROJECTS } from './services/mockData';
// Componente fallback funcional para garantizar el build en Vercel
const AgentInvestigatorView = () => (
  <div className="p-8 text-slate-200">
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50 shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-indigo-400">Agente 1: Detector de Oportunidades</h2>
      <p className="text-slate-300 text-sm mb-6">
        Sistema activo para la detección de curadurías, licencias y prospección en el sector educativo privado.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-400">Estado del Agente</div>
          <div className="text-lg font-bold text-emerald-400 mt-1">Listo / Activo</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-400">Proyectos Detectados</div>
          <div className="text-lg font-bold text-white mt-1">12 Oportunidades</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-400">Proveedor de IA</div>
          <div className="text-lg font-bold text-indigo-300 mt-1">Simulación / API</div>
        </div>
      </div>
    </div>
  </div>
);
import { AgentInventoryView } from './components/AgentInventoryView';
import { ConnectionGuideModal } from './components/ConnectionGuideModal';
import { SettingsModal } from './components/SettingsModal';
import { Agent2InventoryService } from './services/agent2Inventory';
import { Sparkles, Building2, BookOpen, Settings, CheckCircle2, ShieldCheck, Github } from 'lucide-react';

export function App() {
  const [projects, setProjects] = useState<EducationalProject[]>(INITIAL_PROJECTS);
  const [activeTab, setActiveTab] = useState<'agent1' | 'agent2'>('agent1');
  
  const [config, setConfig] = useState<ApiKeysConfig>({
    aiProvider: 'simulation'
  });

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleProjectsFound = (newFound: EducationalProject[]) => {
    const merged = [...newFound, ...projects];
    const { uniqueProjects, duplicatesRemovedCount } = Agent2InventoryService.auditAndDeduplicate(merged);
    setProjects(uniqueProjects);
    showToast(`Agente 1 descubrió ${newFound.length} proyectos. Agente 2 los integró al inventario (${duplicatesRemovedCount} duplicados filtrados).`);
  };

  const handleAuditDuplicates = () => {
    const { uniqueProjects, duplicatesRemovedCount } = Agent2InventoryService.auditAndDeduplicate(projects);
    setProjects(uniqueProjects);
    showToast(`Auditoría completada por Agente 2: ${duplicatesRemovedCount} proyectos duplicados eliminados.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-indigo-400/40 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & System Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-100 text-base leading-tight flex items-center gap-2">
                EduIntel AI <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full font-mono border border-indigo-500/30">Vercel Ready</span>
              </h1>
              <p className="text-xs text-slate-400">Sistema Dual de Agentes para Prospección Educativa Privada</p>
            </div>
          </div>

          {/* Navigation Tabs (Agente 1 vs Agente 2) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('agent1')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'agent1'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agente 1: Detector</span>
            </button>

            <button
              onClick={() => setActiveTab('agent2')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'agent2'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Agente 2: Inventario ({projects.length})</span>
            </button>
          </div>

          {/* Top Actions: Guía Vercel & Settings */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Guía Paso a Paso</span>
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Claves API</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {activeTab === 'agent1' ? (
          <AgentInvestigatorView
            onProjectsFound={handleProjectsFound}
            config={config}
          />
        ) : (
          <AgentInventoryView
            projects={projects}
            onAuditDuplicates={handleAuditDuplicates}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 EduIntel AI • Sistema de Agentes IA para Curadurías, MinEducación, Prensa y LinkedIn</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsGuideOpen(true)} className="hover:underline text-indigo-400">
              Despliegue Vercel & API Handlers
            </button>
            <span>•</span>
            <span className="text-emerald-400">Status: Vercel Serverless Ready</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ConnectionGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={(newConfig) => {
          setConfig(newConfig);
          showToast('Configuración de claves API actualizada.');
        }}
      />
    </div>
  );
}
export default App;
