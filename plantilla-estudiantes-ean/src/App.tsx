import React, { useState, useEffect, useMemo } from 'react';
import { useSheetsData } from './hooks/useSheetsData';
import { Topbar } from './components/Topbar';
import { PosCatalog } from './components/PosCatalog';
import { PosCart } from './components/PosCart';
import { ReceiptModal } from './components/ReceiptModal';
import { DataTable } from './components/DataTable';
import { GuideModal } from './components/GuideModal';
import { PosProduct, CartItem, SaleRecord } from './types/pos';
import { ShoppingBag, LayoutGrid, Table, DollarSign, PackageCheck, AlertCircle, FileSpreadsheet } from 'lucide-react';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pos' | 'inventory'>('pos');
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastSale, setLastSale] = useState<SaleRecord | null>(null);
  const [completedSales, setCompletedSales] = useState<SaleRecord[]>([]);

  const {
    dataset,
    loading,
    syncing,
    error,
    lastUpdated,
    activeUrl,
    refreshInterval,
    setActiveUrl,
    setRefreshInterval,
    loadSampleDataset,
    refetch
  } = useSheetsData();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Convertir las filas crudas de Google Sheets en objetos PosProduct estructurados
  const products: PosProduct[] = useMemo(() => {
    if (!dataset.rawRows || dataset.rawRows.length === 0) return [];

    return dataset.rawRows.map((row, index) => {
      const sku = String(row.SKU || row.sku || row.Codigo || `SKU-${1000 + index}`);
      const barcode = String(row.CodigoBarras || row.barcode || row.Codigo_Barras || `7701234567${index < 10 ? '0' + index : index}`);
      const name = String(row.Producto || row.producto || row.Nombre || row.Item || `Producto #${index + 1}`);
      const category = String(row.Categoria || row.categoria || row.Grupo || 'General');
      
      const unitPrice = typeof row.PrecioUnitario === 'number' 
        ? row.PrecioUnitario 
        : typeof row.Precio === 'number' 
        ? row.Precio 
        : 1000;

      const costPrice = typeof row.PrecioCosto === 'number' ? row.PrecioCosto : unitPrice * 0.65;
      
      const vatPercent = typeof row.ImpuestoIVA === 'number' 
        ? row.ImpuestoIVA 
        : parseFloat(String(row.ImpuestoIVA || '19').replace('%', '')) || 19;

      const stock = typeof row.Stock === 'number' ? row.Stock : 50;
      const unitOfMeasure = String(row.UnidadMedida || row.unidad || 'Unidad');
      const provider = String(row.Proveedor || row.proveedor || 'Proveedor General');
      const status = String(row.Estado || (stock > 0 ? 'Disponible' : 'Agotado'));

      return {
        sku,
        barcode,
        name,
        category,
        unitPrice,
        costPrice,
        vatPercent,
        stock,
        unitOfMeasure,
        provider,
        status,
        rawRow: row
      };
    });
  }, [dataset.rawRows]);

  // Carrito handlers
  const handleAddToCart = (product: PosProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.sku === product.sku);
      if (existing) {
        return prev.map(item =>
          item.product.sku === product.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (sku: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.sku === sku) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (sku: string) => {
    setCartItems(prev => prev.filter(item => item.product.sku !== sku));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCompleteSale = (sale: SaleRecord) => {
    setCompletedSales(prev => [sale, ...prev]);
    setLastSale(sale);
    setCartItems([]);
  };

  // Totales acumulados del día
  const dailyTotalSales = completedSales.reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="app-container">
      {/* Top Header Controls */}
      <Topbar
        activeUrl={activeUrl}
        onUrlSubmit={setActiveUrl}
        syncing={syncing}
        loading={loading}
        error={error}
        lastUpdated={lastUpdated}
        refreshInterval={refreshInterval}
        onRefreshIntervalChange={setRefreshInterval}
        onSelectSample={loadSampleDataset}
        onOpenGuide={() => setIsGuideOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        onManualRefetch={refetch}
      />

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={activeTab === 'pos' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setActiveTab('pos')}
            style={{ padding: '0.55rem 1.1rem' }}
          >
            <ShoppingBag size={16} /> Caja POS (Registradora)
          </button>
          <button
            className={activeTab === 'inventory' ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setActiveTab('inventory')}
            style={{ padding: '0.55rem 1.1rem' }}
          >
            <Table size={16} /> Inventario Google Sheets ({products.length} productos)
          </button>
        </div>

        {/* Daily Sales Quick Summary Badge */}
        <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ventas de Hoy:</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-success)' }}>
            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(dailyTotalSales)}
          </span>
          <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
            {completedSales.length} tickets
          </span>
        </div>
      </div>

      {/* Main Body depending on Tab */}
      {activeTab === 'pos' ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'flex-start' }}>
          {/* Left Grid: Catalog by SKU */}
          <PosCatalog products={products} onAddToCart={handleAddToCart} />

          {/* Right Panel: Cart & Checkout */}
          <PosCart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onCompleteSale={handleCompleteSale}
          />
        </div>
      ) : (
        /* Inventory Table Tab */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <DataTable rows={dataset.rawRows} columns={dataset.columns} />
        </div>
      )}

      {/* Printable Receipt Modal */}
      <ReceiptModal sale={lastSale} onClose={() => setLastSale(null)} />

      {/* Google Sheets Step by Step Guide Modal */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
};
export default App;
