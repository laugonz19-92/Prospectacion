import React from 'react';
import { X, ExternalLink, CheckCircle2, HelpCircle, Globe, Link2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
              <HelpCircle size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Conectar tu Google Sheet en Tiempo Real</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          Para que la aplicación pueda leer y actualizar los datos en tiempo real sin requerir contraseña, debes permitir el acceso público a tu hoja de cálculo.
        </p>

        {/* Método 1 */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Globe size={18} style={{ color: 'var(--accent-success)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-success)' }}>
              Método 1: Publicar en la Web (Recomendado)
            </h3>
          </div>
          <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
            <li>Abre tu hoja en <strong>Google Sheets</strong>.</li>
            <li>Haz clic en el menú superior <strong>Archivo ➔ Compartir ➔ Publicar en la web</strong>.</li>
            <li>En la ventana emergente, selecciona la pestaña deseada y cambia el formato a <strong>Valores separados por comas (.csv)</strong>.</li>
            <li>Haz clic en el botón azul <strong>Publicar</strong>.</li>
            <li>Copia el enlace generado (ej: <code>https://docs.google.com/spreadsheets/d/e/2PACX.../pub?output=csv</code>).</li>
            <li>Pégalo en el campo superior de esta aplicación.</li>
          </ol>
        </div>

        {/* Método 2 */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Link2 size={18} style={{ color: 'var(--accent-secondary)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-secondary)' }}>
              Método 2: Enlace de Compartir Público
            </h3>
          </div>
          <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
            <li>Abre tu hoja en <strong>Google Sheets</strong>.</li>
            <li>Haz clic en el botón azul <strong>Compartir</strong> (arriba a la derecha).</li>
            <li>En <em>Acceso general</em>, cambia a <strong>"Cualquier persona con el enlace"</strong> (Rol: Lector).</li>
            <li>Haz clic en <strong>Copiar enlace</strong>.</li>
            <li>Pégalo directamente aquí. Nuestra aplicación lo convertirá automáticamente a formato CSV.</li>
          </ol>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={onClose}>
            <CheckCircle2 size={16} /> Entendido, ir al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
