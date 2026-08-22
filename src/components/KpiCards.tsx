import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Hash, BarChart2 } from 'lucide-react';
import { KpiItem } from '../utils/dataSanitizer';

interface KpiCardsProps {
  kpis: KpiItem[];
  loading: boolean;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ kpis, loading }) => {
  if (loading && kpis.length === 0) {
    return (
      <div className="grid-kpis">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass-card" style={{ height: '110px', opacity: 0.6 }}>
            <div style={{ background: 'var(--border-color)', height: '16px', width: '40%', borderRadius: '4px', marginBottom: '1rem' }} />
            <div style={{ background: 'var(--border-color)', height: '28px', width: '70%', borderRadius: '6px' }} />
          </div>
        ))}
      </div>
    );
  }

  if (kpis.length === 0) return null;

  const getKpiIcon = (kpi: KpiItem) => {
    if (kpi.isCurrency) return <DollarSign size={20} style={{ color: 'var(--accent-success)' }} />;
    if (kpi.isPercentage) return <Percent size={20} style={{ color: 'var(--accent-secondary)' }} />;
    return <BarChart2 size={20} style={{ color: 'var(--accent-primary)' }} />;
  };

  return (
    <div className="grid-kpis">
      {kpis.map((kpi) => {
        const isPositive = kpi.changePercent >= 0;
        return (
          <div key={kpi.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {kpi.title}
              </span>
              <div style={{ padding: '0.4rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
                {getKpiIcon(kpi)}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
                {kpi.formattedValue}
              </span>

              <div className={`badge ${isPositive ? 'badge-success' : 'badge-warning'}`}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{isPositive ? `+${kpi.changePercent}%` : `${kpi.changePercent}%`}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
