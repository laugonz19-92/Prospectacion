import React, { useState, useEffect } from 'react';
import { saveLocalLead, getLocalLeads, OpportunityLead } from '../services/agent1Investigator';

const initialMockLeads: OpportunityLead[] = [
  {
    id: 'lead-101',
    institutionName: 'Colegio Campestre San José',
    projectType: 'Ampliación de Aulas & Laboratorio STEM',
    city: 'Bogotá',
    investmentUSD: '$1.2M',
    areaM2: '3.500 m²',
    status: 'Licencia Radicada',
    confidenceScore: 0.92,
    sourceUrl: 'https://curaduria.gov.co/licencias/2026-081'
  },
  {
    id: 'lead-102',
    institutionName: 'Universidad Pedagógica Nacional',
    projectType: 'Remodelación de Cafetería Institucional y Biblioteca',
    city: 'Bogotá',
    investmentUSD: '$2.8M',
    areaM2: '6.200 m²',
    status: 'Licencia Aprobada',
    confidenceScore: 0.88,
    sourceUrl: 'https://curaduria.gov.co/licencias/2026-094'
  }
];

export const AgentInvestigatorView: React.FC = () => {
  const [detectedLeads, setDetectedLeads] = useState<OpportunityLead[]>(initialMockLeads);
  const [isScanning, setIsScanning] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = getLocalLeads();
    setSavedIds(saved.map((item) => item.id));
  }, []);

  const handleRunProspection = () => {
    setIsScanning(true);
    setTimeout(() => {
      const newLead: OpportunityLead = {
        id: `lead-${Date.now()}`,
        institutionName: 'Gimnasio Moderno - Sede Norte',
        projectType: 'Construcción de Complejo Deportivo y Aulas Modulares',
        city: 'Bogotá',
        investmentUSD: '$4.5M',
        areaM2: '8.000 m²',
        status: 'En Revisión',
        confidenceScore: 0.95,
        sourceUrl: 'https://curaduria.gov.co/licencias/2026-105'
      };
      setDetectedLeads((prev) => [newLead, ...prev]);
      setIsScanning(false);
    }, 1200);
  };

  const handleSaveToInventory = (lead: OpportunityLead) => {
    saveLocalLead(lead);
    setSavedIds((prev) => [...prev, lead.id]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-900 p-6 rounded-xl border border-gray-800 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Agente 1: Detector de Oportunidades</h2>
          <p className="text-gray-400 text-sm mt-1">
            Sistema activo para la detección de curadurías, licencias y prospección en el sector educativo privado.
          </p>
        </div>
        <button
          onClick={handleRunProspection}
          disabled={isScanning}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg transition disabled:opacity-50"
        >
          {isScanning ? 'Rastreando Licencias...' : 'Ejecutar Prospección IA'}
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">
            Oportunidades Detectadas ({detectedLeads.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-800/60 text-xs text-gray-400 uppercase">
              <tr>
                <th className="p-4">Institución & Proyecto</th>
                <th className="p-4">Ciudad</th>
                <th className="p-4">Inversión USD</th>
                <th className="p-4">Área M²</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {detectedLeads.map((lead) => {
                const isSaved = savedIds.includes(lead.id);
                return (
                  <tr key={lead.id} className="hover:bg-gray-800/40 transition">
                    <td className="p-4">
                      <div className="font-semibold text-white">{lead.institutionName}</div>
                      <div className="text-xs text-gray-400">{lead.projectType}</div>
                    </td>
                    <td className="p-4">{lead.city}</td>
                    <td className="p-4 text-emerald-400 font-medium">{lead.investmentUSD}</td>
                    <td className="p-4">{lead.areaM2}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 text-xs font-semibold bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 rounded-full">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleSaveToInventory(lead)}
                        disabled={isSaved}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                          isSaved
                            ? 'bg-emerald-900/40 text-emerald-400 cursor-default border border-emerald-700/50'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isSaved ? 'Enviado a Agente 2 ✓' : 'Guardar en Inventario'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
