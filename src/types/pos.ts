export interface PosProduct {
  sku: string;
  barcode: string;
  name: string;
  category: string;
  unitPrice: number;
  costPrice: number;
  vatPercent: number;
  stock: number;
  unitOfMeasure: string;
  provider: string;
  status: string;
  rawRow: Record<string, any>;
}

export interface CartItem {
  product: PosProduct;
  quantity: number;
}

export interface SaleRecord {
  id: string;
  timestamp: Date;
  items: CartItem[];
  subtotal: number;
  vatTotal: number;
  discount: number;
  total: number;
  paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia / Nequi';
}
