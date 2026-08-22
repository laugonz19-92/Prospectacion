import React, { useState } from 'react';
import { 
  Activity, 
  RefreshCw, 
  HelpCircle, 
  Sun, 
  Moon, 
  Link as LinkIcon, 
  Database,
  Check,
  AlertCircle
} from 'lucide-react';
import { SAMPLE_DATASETS } from '../utils/sampleData';

interface TopbarProps {
  activeUrl: string;
  onUrlSubmit: (url: string) => void;
  syncing: boolean;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshInterval: number;
  onRefreshIntervalChange: (intervalMs: number) => void;
  onSelectSample: (sampleId: string) => void;
  onOpenGuide: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onManualRefetch: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  activeUrl,
  onUrlSubmit,
  syncing,
  loading,
  error,
  lastUpdated,
  refreshInterval,
  onRefreshIntervalChange,
  onSelectSample,
  onOpenGuide,
  theme,
  onToggleTheme,
  onManualRefetch
}) => {
  const [inputUrl, setInputUrl] = useState(activeUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onUrlSubmit(inputUrl.trim());
    }
  };

  return (
    <header className="glass-card" style={{ padding: '1rem 1.25rem', marginBottom: '0.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            padding: '0.6rem',
            borderRadius: '12px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
          }}>
            <Activity size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, var(--text-main), var(--accent-primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Sheets Real-Time Dashboard
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
              <span className={`live-dot ${error ? 'error' : syncing ? 'syncing' : ''}`} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: error ? 'var(--accent-danger)' : 'var(--text-muted)' }}>
                {error 
                  ? 'Error de conexión' 
                  : syncing 
                  ? 'Sincronizando...' 
                  : `Live Sync (${refreshInterval / 1000}s)`}
              </span>
              {lastUpdated && !error && (
                <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                  • Actualizado {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flex: '1 1 350px', maxWidth: '600px', gap: '0.5rem' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <LinkIcon size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
            <input
              type="url"
              className="input-field"
              style={{ paddingLeft: '2.4rem' }}
              placeholder="Pega tu enlace de Google Sheets aquí..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <RefreshCw size={16} className="spin" /> : <Check size={16} />}
            <span>Conectar</span>
          </button>
        </form>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Sample Datasets Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Database size={15} style={{ color: 'var(--text-subtle)' }} />
            <select
              className="input-field"
              style={{ width: 'auto', padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
              onChange={(e) => onSelectSample(e.target.value)}
              defaultValue={SAMPLE_DATASETS[0].id}
            >
              <option value="" disabled>Seleccionar Demo...</option>
              {SAMPLE_DATASETS.map(sample => (
                <option key={sample.id} value={sample.id}>
                  {sample.name}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Rate Selector */}
          <select
            className="input-field"
            style={{ width: 'auto', padding: '0.5rem 0.6rem', fontSize: '0.8rem' }}
            value={refreshInterval}
            onChange={(e) => onRefreshIntervalChange(Number(e.target.value))}
            title="Intervalo de refresco en segundo plano"
          >
            <option value={3000}>3 seg</option>
            <option value={5000}>5 seg</option>
            <option value={10000}>10 seg</option>
            <option value={30000}>30 seg</option>
          </select>

          {/* Manual Refresh Button */}
          <button 
            className="btn-secondary" 
            onClick={onManualRefetch}
            style={{ padding: '0.5rem 0.75rem' }} 
            title="Forzar actualización ahora"
          >
            <RefreshCw size={15} className={syncing ? 'spin' : ''} />
          </button>

          {/* Help Modal Button */}
          <button 
            className="btn-secondary" 
            onClick={onOpenGuide}
            style={{ padding: '0.5rem 0.75rem' }}
            title="¿Cómo conectar tu enlace?"
          >
            <HelpCircle size={16} />
            <span style={{ fontSize: '0.8rem' }}>Guía</span>
          </button>

          {/* Theme Toggle Button */}
          <button 
            className="btn-secondary" 
            onClick={onToggleTheme}
            style={{ padding: '0.5rem 0.6rem' }}
            title="Cambiar tema"
          >
            {theme === 'dark' ? <Sun size={16} style={{ color: '#f59e0b' }} /> : <Moon size={16} />}
          </button>
        </div>

      </div>

      {/* Error Bar if present */}
      {error && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.65rem 1rem',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '10px',
          color: 'var(--accent-danger)',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={16} />
          <span>{error}</span>
          <button 
            onClick={onOpenGuide} 
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--accent-danger)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
          >
            Ver cómo solucionar
          </button>
        </div>
      )}
    </header>
  );
};
