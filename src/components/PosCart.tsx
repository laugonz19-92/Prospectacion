import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, Smartphone, CheckCircle, Percent } from 'lucide-react';
import { CartItem, PosProduct, SaleRecord } from '../types/pos';

interface PosCartProps {
  items: CartItem[];
  onUpdateQuantity: (sku: string, delta: number) => void;
  onRemoveItem: (sku: string) => void;
  onClearCart: () => void;
  onCompleteSale: (sale: SaleRecord) => void;
}

export const PosCart: React.FC<PosCartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCompleteSale,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Tarjeta' | 'Transferencia / Nequi'>('Efectivo');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Cálculos financieros
  const subtotal = items.reduce((sum, item) => sum + (item.product.unitPrice * item.quantity), 0);
  const vatTotal = items.reduce((sum, item) => {
    const itemSubtotal = item.product.unitPrice * item.quantity;
    const vatRate = item.product.vatPercent || 19;
    return sum + (itemSubtotal * (vatRate / 100));
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    const newSale: SaleRecord = {
      id: `POS-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date(),
      items: [...items],
      subtotal,
      vatTotal,
      discount: discountAmount,
      total,
      paymentMethod,
    };

    onCompleteSale(newSale);
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: '320px', maxWidth: '420px', flex: '1 1 340px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingCart size={20} style={{ color: 'var(--accent-primary)' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Carrito de Caja</h3>
        </div>
        {items.length > 0 && (
          <button
            onClick={onClearCart}
            style={{ background: 'none', border: 'none', color: 'var(--accent-danger)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
          >
            Vaciar
          </button>
        )}
      </div>

      {/* Cart Items List */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem', minHeight: '220px' }}>
        {items.length > 0 ? (
          items.map(item => (
            <div
              key={item.product.sku}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ flex: 1, paddingRight: '0.5rem' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.product.name}</h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  SKU: {item.product.sku} • {formatCurrency(item.product.unitPrice)} c/u
                </span>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  className="btn-secondary"
                  style={{ padding: '0.2rem 0.4rem' }}
                  onClick={() => onUpdateQuantity(item.product.sku, -1)}
                >
                  <Minus size={12} />
                </button>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button
                  className="btn-secondary"
                  style={{ padding: '0.2rem 0.4rem' }}
                  onClick={() => onUpdateQuantity(item.product.sku, 1)}
                >
                  <Plus size={12} />
                </button>
                <button
                  onClick={() => onRemoveItem(item.product.sku)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', marginLeft: '0.2rem', cursor: 'pointer' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
            <ShoppingCart size={36} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>El carrito está vacío</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>Haz clic en "Agregar" en los productos del inventario.</p>
          </div>
        )}
      </div>

      {/* Payment Method & Totals Breakdown */}
      {items.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Payment Method Selector */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              Método de Pago:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.4rem' }}>
              <button
                className={paymentMethod === 'Efectivo' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setPaymentMethod('Efectivo')}
                style={{ padding: '0.4rem', fontSize: '0.7rem', justifyContent: 'center' }}
              >
                <Banknote size={12} /> Efectivo
              </button>
              <button
                className={paymentMethod === 'Tarjeta' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setPaymentMethod('Tarjeta')}
                style={{ padding: '0.4rem', fontSize: '0.7rem', justifyContent: 'center' }}
              >
                <CreditCard size={12} /> Tarjeta
              </button>
              <button
                className={paymentMethod === 'Transferencia / Nequi' ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setPaymentMethod('Transferencia / Nequi')}
                style={{ padding: '0.4rem', fontSize: '0.7rem', justifyContent: 'center' }}
              >
                <Smartphone size={12} /> Nequi/Trans.
              </button>
            </div>
          </div>

          {/* Discount Selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Percent size={12} /> Descuento:
            </span>
            <select
              className="input-field"
              style={{ width: 'auto', padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              value={discountPercent}
              onChange={e => setDiscountPercent(Number(e.target.value))}
            >
              <option value={0}>Sin Descuento (0%)</option>
              <option value={5}>5% Off</option>
              <option value={10}>10% Off</option>
              <option value={15}>15% Off</option>
            </select>
          </div>

          {/* Financial Totals */}
          <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '0.75rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>IVA Estimado (19%):</span>
              <span>{formatCurrency(vatTotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-danger)' }}>
                <span>Descuento Aplicado:</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-success)', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
              <span>TOTAL:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            className="btn-primary"
            onClick={handleCheckout}
            style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', fontSize: '1rem' }}
          >
            <CheckCircle size={18} /> COBRAR {formatCurrency(total)}
          </button>

        </div>
      )}
    </div>
  );
};
