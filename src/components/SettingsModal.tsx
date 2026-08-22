import React, { useState } from 'react';
import { ApiKeysConfig } from '../types/agents';
import { Settings, Key, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: ApiKeysConfig;
  onSaveConfig: (newConfig: ApiKeysConfig) => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose, config, onSaveConfig }) => {
  const [formData, setFormData] = useState<ApiKeysConfig>({ ...config });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-bold text-slate-100">
            <Settings className="w-5 h-5 text-indigo-400" />
            <span>Configuración de Agentes & Claves</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Proveedor de Inteligencia Artificial</label>
            <select
              value={formData.aiProvider}
              onChange={(e) => setFormData({ ...formData, aiProvider: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200"
            >
              <option value="simulation">Síntesis Inteligente Asistida (Modo por defecto)</option>
              <option value="openai">OpenAI (GPT-4o)</option>
              <option value="gemini">Google Gemini</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">OpenAI API Key (Opcional)</label>
            <input
              type="password"
              placeholder="sk-..."
              value={formData.openaiApiKey || ''}
              onChange={(e) => setFormData({ ...formData, openaiApiKey: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Google Gemini API Key (Opcional)</label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={formData.geminiApiKey || ''}
              onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 font-mono"
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-400 space-y-1">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" /> Seguridad de las Claves
            </div>
            <p className="text-[11px]">
              Las claves se guardan localmente en tu navegador. Al desplegar en Vercel, se recomienda configurarlas como Environment Variables.
            </p>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-800 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium"
            >
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
