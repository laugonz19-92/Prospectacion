import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, Sparkles, Building2, MapPin, ExternalLink, UserCheck, AlertCircle, Play, CheckCircle2 } from 'lucide-react';
import { SearchFilters, EducationalProject, Agent1Log, ApiKeysConfig } from '../types/agents';
import { Agent1InvestigatorService } from '../services/agent1Investigator';

interface Props {
  onProjectsFound: (newProjects: EducationalProject[]) => void;
  config: ApiKeysConfig;
}

export const AgentInvestigatorView: React.FC<Props> = ({ onProjectsFound, config }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    city: 'TODAS',
    institutionType: 'TODOS',
    eventType: 'TODOS',
    keywords: '',
    sourceFilter: 'TODAS'
  });

  const [isSearching, setIsSearching] = useState(false);
  const [logs, setLogs] = useState<Agent1Log[]>([]);
  const [discovered, setDiscovered] = useState<EducationalProject[]>([]);

  const handleRunAgent1 = async () => {
    setIsSearching(true);
    setLogs([]);
    setDiscovered([]);

    const agent = new Agent1InvestigatorService((newLog) => {
      setLogs((prev) => [...prev, newLog]);
    });

    try {
      const results = await agent.executeSearch(filters, config);
      setDiscovered(results);
      onProjectsFound(results);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Encabezado */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-700/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Agente 1 • Inteligencia & Rastreos Públicos
            </div>
            <h2 className="text-2xl font-bold text-white">Detector de Proyectos & Contactos Educativos</h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Rastrea y consolida en tiempo real licencias de construcción (Curadurías Urbanas), registros calificados y sedes (MinEducación/Secretarías), fusiones en prensa y perfiles de tomadores de decisión (LinkedIn).
            </p>
          </div>

          <button
            onClick={handleRunAgent1}
            disabled={isSearching}
            className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Ejecutando Agente 1...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Iniciar Búsqueda de Fuentes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Formulario de Filtros de Inteligencia */}
      <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Filter className="w-4 h-4 text-indigo-400" />
            <span>Filtros de Prospección Estratégica</span>
          </div>
          <span className="text-xs text-slate-400">
            Proveedor IA: <strong className="text-indigo-300 uppercase">{config.aiProvider}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Ciudad / Región</label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="TODAS">Todas las ciudades</option>
              <option value="Bogotá">Bogotá D.C.</option>
              <option value="Medellín">Medellín / Rionegro</option>
              <option value="Cali">Cali / Valle</option>
              <option value="Barranquilla">Barranquilla / Caribe</option>
              <option value="Bucaramanga">Bucaramanga</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Tipo de Institución</label>
            <select
              value={filters.institutionType}
              onChange={(e) => setFilters({ ...filters, institutionType: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="TODOS">Todos los tipos</option>
              <option value="COLEGIO_PRIVADO">Colegios Privados</option>
              <option value="UNIVERSIDAD_PRIVADA">Universidades Privadas</option>
              <option value="INSTITUTO_TECNICO">Institutos Técnicos</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Tipo de Evento</label>
            <select
              value={filters.eventType}
              onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="TODOS">Todos los eventos</option>
              <option value="LICENCIA_CONSTRUCCION">Licencias de Construcción</option>
              <option value="PLAN_MAESTRO">Planes Maestros de Infraestructura</option>
              <option value="FUSION_INSTITUCIONAL">Fusiones Institucionales</option>
              <option value="NUEVA_SEDE">Apertura de Nuevas Sedes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Búsqueda / Palabras Clave</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Gimnasio, Laboratorios..."
                value={filters.keywords}
                onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Console Log de Ejecución en Tiempo Real */}
      {logs.length > 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-inner space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              Consola del Agente 1 (Rastreos en Vivo)
            </span>
            <span>{logs.length} eventos registrados</span>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-1.5 pt-1">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5 text-slate-300">
                <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                  log.status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  log.status === 'warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  log.status === 'error' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  [{log.step}]
                </span>
                <span className="flex-1">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resultados Descubiertos por el Agente 1 */}
      {discovered.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Proyectos Identificados ({discovered.length})
            </h3>
            <span className="text-xs text-slate-400">
              Datos consolidados listos para auditar en el Agente 2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discovered.map((proj) => (
              <div key={proj.id} className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 hover:border-indigo-500/50 transition-all space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-xs font-medium mb-1">
                      {proj.eventType.replace('_', ' ')}
                    </span>
                    <h4 className="font-bold text-slate-100 text-base">{proj.institutionName}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" /> {proj.city}, {proj.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-semibold">
                      {proj.aiConfidence}% Certeza IA
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 bg-slate-900/50 p-2.5 rounded border border-slate-800">
                  {proj.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs py-1 border-y border-slate-700/50">
                  <div>
                    <span className="text-slate-500 block">Inversión Estimada:</span>
                    <strong className="text-slate-200">${(proj.estimatedInvestmentUSD / 1000000).toFixed(2)}M USD</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Área Licenciada:</span>
                    <strong className="text-slate-200">{proj.estimatedAreaM2.toLocaleString()} m²</strong>
                  </div>
                </div>

                {/* Contactos Clave Consolidados */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> Contactos Clave Consolidados ({proj.keyContacts.length})
                  </span>
                  <div className="space-y-1">
                    {proj.keyContacts.map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between text-xs bg-slate-900/80 px-2.5 py-1.5 rounded text-slate-300">
                        <div>
                          <span className="font-medium text-slate-200">{contact.name}</span>
                          <span className="text-slate-400 block text-[11px]">{contact.role}</span>
                        </div>
                        {contact.linkedInUrl && (
                          <a
                            href={contact.linkedInUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[11px]"
                          >
                            LinkedIn <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
