import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { TrendPoint, CategoryPoint } from '../utils/dataSanitizer';

interface ChartsSectionProps {
  trendData: TrendPoint[];
  categoryData: CategoryPoint[];
  numericColumns: string[];
  categoryColumnName: string | null;
}

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export const ChartsSection: React.FC<ChartsSectionProps> = ({
  trendData,
  categoryData,
  numericColumns,
  categoryColumnName
}) => {
  if (trendData.length === 0 && categoryData.length === 0) return null;

  const primaryMetric = numericColumns[0] || 'Valor';
  const secondaryMetric = numericColumns[1] || null;

  return (
    <div className="grid-charts">
      {/* Trend Chart (Area Chart) */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '360px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Tendencia de {primaryMetric}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Evolución temporal de registros</p>
          </div>
        </div>

        <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                {secondaryMetric && (
                  <linearGradient id="colorSecondary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                )}
              </defs>
              <XAxis dataKey="date" stroke="var(--text-subtle)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-subtle)" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)', 
                  borderRadius: '12px',
                  color: 'var(--text-main)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)' 
                }} 
              />
              <Area type="monotone" dataKey={primaryMetric} stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrimary)" />
              {secondaryMetric && (
                <Area type="monotone" dataKey={secondaryMetric} stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorSecondary)" />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown (Bar Chart or Doughnut) */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '360px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
              Distribución por {categoryColumnName || 'Categoría'}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Comparación relativa por segmento</p>
          </div>
        </div>

        <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="var(--text-subtle)" fontSize={11} tickLine={false} />
              <YAxis stroke="var(--text-subtle)" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-color)', 
                  borderRadius: '12px',
                  color: 'var(--text-main)' 
                }} 
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
