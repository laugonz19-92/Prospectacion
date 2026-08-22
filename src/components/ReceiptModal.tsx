import React from 'react';
import { X, Printer, CheckCircle2, ShoppingBag, Calendar, CreditCard } from 'lucide-react';
import { SaleRecord } from '../types/pos';

interface ReceiptModalProps {
  sale: SaleRecord | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ sale, onClose }) => {
  if (!sale) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '480px', padding: '1.75rem' }} onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-success)' }}>
            <CheckCircle2 size={24} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Venta Registrada Exitosamente</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Receipt Paper Printable Container */}
        <div 
          id="printable-receipt"
          style={{ 
            background: '#ffffff', 
            color: '#111827', 
            padding: '1.25rem', 
            borderRadius: '12px', 
            fontFamily: 'monospace', 
            fontSize: '0.82rem',
            border: '1px dashed #d1d5db',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ textAlign: 'center', borderBottom: '1px dashed #9ca3af', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>TIENDA POS EAN 2026</h2>
            <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>NIT: 900.123.456-7 • Bogotá, Colombia</p>
            <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>Sistema de Caja Registradora Google Sheets</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.75rem' }}>
            <span><strong>Ticket N°:</strong> {sale.id}</span>
            <span>{sale.timestamp.toLocaleDateString()} {sale.timestamp.toLocaleTimeString()}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.75rem' }}>
            <span><strong>Pago:</strong> {sale.paymentMethod}</span>
            <span><strong>Estado:</strong> Pagado</span>
          </div>

          {/* Items Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.75rem', fontSize: '0.75rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                <th style={{ padding: '0.25rem 0' }}>Cant x Producto</th>
                <th style={{ textAlign: 'right', padding: '0.25rem 0' }}>P.Unit</th>
                <th style={{ textAlign: 'right', padding: '0.25rem 0' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.35rem 0' }}>
                    {item.quantity}x {item.product.name}
                    <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>SKU: {item.product.sku}</div>
                  </td>
                  <td style={{ textAlign: 'right', padding: '0.35rem 0' }}>
                    {formatCurrency(item.product.unitPrice)}
                  </td>
                  <td style={{ textAlign: 'right', padding: '0.35rem 0', fontWeight: 600 }}>
                    {formatCurrency(item.product.unitPrice * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Breakdown */}
          <div style={{ borderTop: '1px dashed #9ca3af', paddingTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>{formatCurrency(sale.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>IVA (19% Incluido):</span>
              <span>{formatCurrency(sale.vatTotal)}</span>
            </div>
            {sale.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dc2626' }}>
                <span>Descuento:</span>
                <span>-{formatCurrency(sale.discount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, borderTop: '1px solid #111827', paddingTop: '0.35rem', marginTop: '0.25rem' }}>
              <span>TOTAL A PAGAR:</span>
              <span>{formatCurrency(sale.total)}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '0.5rem', borderTop: '1px dashed #9ca3af', fontSize: '0.7rem', color: '#6b7280' }}>
            ¡Gracias por tu compra en Tienda EAN!
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={16} /> Imprimir Recibo
          </button>
          <button className="btn-primary" onClick={onClose}>
            Nueva Venta
          </button>
        </div>

      </div>
    </div>
  );
};
