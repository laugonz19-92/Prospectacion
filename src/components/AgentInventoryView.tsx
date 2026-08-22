import React, { useState } from 'react';
import { EducationalProject } from '../types/agents';
import { Agent2InventoryService } from '../services/agent2Inventory';
import { Building2, DollarSign, Maximize2, Users, Download, RefreshCw, FileText, ExternalLink, CheckCircle, ShieldAlert, Sparkles, Filter } from 'lucide-react';

interface Props {
  projects: EducationalProject[];
  onAuditDuplicates: () => void;
}

export const AgentInventoryView: React.FC<Props> = ({ projects, onAuditDuplicates }) => {
  const [selectedProject, setSelectedProject] = useState<EducationalProject | null>(null);
  const [filterCity, setFilterCity] = useState<string>('TODAS');
  const [filterPriority, setFilterPriority] = useState<string>('TODAS');

  const metrics = Agent2InventoryService.calculateMetrics(projects);

  const filteredProjects = projects.filter((p) => {
    if (filterCity !== 'TODAS' && p.city.toLowerCase() !== filterCity.toLowerCase()) return false;
    if (filterPriority !== 'TODAS' && p.priority !== filterPriority) return false;
    return true;
  });

  const handleExportCSV = () => {
    const csvContent = Agent2InventoryService.exportToCSV(projects);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `inventario_proyectos_educativos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Banner Encabezado del Agente 2 */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-emerald-700/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Agente 2 • Inventario, Auditoría & Analítica
            </div>
            <h2 className="text-2xl font-bold text-white">Inventario Unificado & Gestor de Oportunidades</h2>
            <p className="text-slate-300 text-sm max-w-2xl">
              Consolida, clasifica, audita duplicados y genera métricas de negocio para la toma de decisiones sobre licencias y proyectos de colegios y universidades privadas.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onAuditDuplicates}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium rounded-xl text-xs flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              Auditar & Deduplicar
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <Download className="w-4 h-4" />
              Exportar Inventario CSV
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas KPI de Métricas Consolidadas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Proyectos Totales</span>
            <strong className="text-2xl text-slate-100 font-bold">{metrics.totalProjects}</strong>
          </div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Inversión Est. USD</span>
            <strong className="text-2xl text-slate-100 font-bold">
              ${(metrics.totalInvestmentUSD / 1000000).toFixed(1)}M
            </strong>
          </div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400">
            <Maximize2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Área Licenciada</span>
            <strong className="text-2xl text-slate-100 font-bold">
              {metrics.totalAreaM2.toLocaleString()} m²
            </strong>
          </div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Contactos Clave</span>
            <strong className="text-2xl text-slate-100 font-bold">{metrics.totalContacts}</strong>
          </div>
        </div>
      </div>

      {/* Filtros Rápido de Tabla */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-300">Filtrar Inventario:</span>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200"
          >
            <option value="TODAS">Todas las Ciudades</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Medellín">Medellín</option>
            <option value="Cali">Cali</option>
            <option value="Barranquilla">Barranquilla</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200"
          >
            <option value="TODAS">Todas las Prioridades</option>
            <option value="CRITICA">Crítica</option>
            <option value="ALTA">Alta</option>
            <option value="MEDIA">Media</option>
            <option value="BAJA">Baja</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Mostrando <strong>{filteredProjects.length}</strong> de {projects.length} registros
        </span>
      </div>

      {/* Tabla Interactiva de Inventario */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-700">
              <tr>
                <th className="p-3.5">Institución & Proyecto</th>
                <th className="p-3.5">Ciudad</th>
                <th className="p-3.5">Tipo Evento</th>
                <th className="p-3.5">Inversión USD</th>
                <th className="p-3.5">Área m²</th>
                <th className="p-3.5">Prioridad</th>
                <th className="p-3.5">Estado</th>
                <th className="p-3.5">Contactos</th>
                <th className="p-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredProjects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-100 text-sm">{proj.institutionName}</div>
                    <div className="text-slate-400 text-[11px] truncate max-w-xs">{proj.title}</div>
                    {proj.licenseNumber && (
                      <span className="inline-block mt-0.5 text-[10px] text-indigo-400 font-mono">
                        {proj.licenseNumber}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-300 font-medium">{proj.city}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[11px] font-medium text-indigo-300">
                      {proj.eventType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-200">
                    ${(proj.estimatedInvestmentUSD / 1000000).toFixed(2)}M
                  </td>
                  <td className="p-3.5 font-medium text-slate-300">
                    {proj.estimatedAreaM2.toLocaleString()} m²
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      proj.priority === 'CRITICA' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      proj.priority === 'ALTA' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {proj.priority}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[11px] font-semibold border border-emerald-500/20">
                      {proj.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-slate-300 rounded text-[11px]">
                      <Users className="w-3 h-3 text-indigo-400" />
                      {proj.keyContacts ? proj.keyContacts.length : 0}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded border border-indigo-500/30 text-[11px] font-medium transition-all"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Drawer para Detalle de Contactos Clave */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs rounded font-semibold">
                  {selectedProject.eventType.replace('_', ' ')}
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-1">{selectedProject.institutionName}</h3>
                <p className="text-xs text-slate-400">{selectedProject.title}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Fuente Pública:</span>
                  <strong className="text-slate-200">{selectedProject.publicSource}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Ubicación:</span>
                  <strong className="text-slate-200">{selectedProject.address || selectedProject.city}</strong>
                </div>
              </div>

              <h4 className="font-bold text-slate-200 pt-2 flex items-center gap-1.5 text-sm">
                <Users className="w-4 h-4 text-emerald-400" />
                Contactos Clave Consolidados ({selectedProject.keyContacts.length})
              </h4>

              <div className="space-y-2">
                {selectedProject.keyContacts.map((contact) => (
                  <div key={contact.id} className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-100 text-sm">{contact.name}</strong>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold rounded">
                        Verificado por IA
                      </span>
                    </div>
                    <p className="text-indigo-300 text-xs font-medium">{contact.role}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 pt-1">
                      {contact.email && (
                        <div>📧 Email: <a href={`mailto:${contact.email}`} className="text-indigo-400 underline">{contact.email}</a></div>
                      )}
                      {contact.phone && (
                        <div>📞 Tel: <span className="text-slate-200">{contact.phone}</span></div>
                      )}
                    </div>

                    {contact.linkedInUrl && (
                      <div className="pt-1">
                        <a
                          href={contact.linkedInUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-xs font-medium"
                        >
                          Ver Perfil en LinkedIn <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-800 pt-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
