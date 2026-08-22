import React, { useState, useMemo } from 'react';
import { Search, Plus, Tag, AlertTriangle, CheckCircle2, Barcode, Package } from 'lucide-react';
import { PosProduct } from '../types/pos';

interface PosCatalogProps {
  products: PosProduct[];
  onAddToCart: (product: PosProduct) => void;
}

export const PosCatalog: React.FC<PosCatalogProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extraer categorías únicas
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return ['Todos', ...cats];
  }, [products]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = !term || 
        p.name.toLowerCase().includes(term) || 
        p.sku.toLowerCase().includes(term) ||
        p.barcode.toLowerCase().includes(term) ||
        p.provider.toLowerCase().includes(term);

      return matchesCat && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1 1 600px' }}>
      
      {/* Category Pills & Search Header */}
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ position: 'relative', flex: '1 1 250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
            <input
              type="text"
              className="input-field"
              placeholder="Buscar por Nombre, SKU (ej: SKU-1001) o Código de Barras..."
              style={{ paddingLeft: '2.4rem' }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>{filteredProducts.length}</strong> productos encontrados
          </span>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.78rem', borderRadius: '20px', whiteSpace: 'nowrap' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {filteredProducts.map(product => {
          const isLowStock = product.stock <= 10 && product.stock > 0;
          const isOutOfStock = product.stock <= 0;

          return (
            <div
              key={product.sku}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1rem',
                position: 'relative',
                opacity: isOutOfStock ? 0.6 : 1,
                border: isOutOfStock ? '1px dashed var(--accent-danger)' : undefined
              }}
            >
              <div>
                {/* SKU Badge & Stock Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                    <Tag size={10} /> {product.sku}
                  </span>

                  <span className={`badge ${isOutOfStock ? 'badge-warning' : isLowStock ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.7rem' }}>
                    {isOutOfStock ? (
                      <> <AlertTriangle size={10} /> Agotado </>
                    ) : (
                      <> <Package size={10} /> {product.stock} {product.unitOfMeasure}s </>
                    )}
                  </span>
                </div>

                {/* Title & Category */}
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-main)', lineHeight: '1.3' }}>
                  {product.name}
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {product.category} • Proveedor: {product.provider}
                </p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '0.75rem' }}>
                  <Barcode size={12} /> {product.barcode}
                </p>
              </div>

              {/* Price & Add to Cart Button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-subtle)', display: 'block' }}>PRECIO UNIT.</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-success)' }}>
                    {formatCurrency(product.unitPrice)}
                  </span>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => onAddToCart(product)}
                  disabled={isOutOfStock}
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                >
                  <Plus size={14} /> Agregar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Package size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
          <p style={{ fontSize: '1rem', fontWeight: 600 }}>No se encontraron productos en el inventario.</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>Prueba buscando por otro SKU o seleccionando "Todos".</p>
        </div>
      )}
    </div>
  );
};
