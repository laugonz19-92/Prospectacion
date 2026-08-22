# 📋 Plantilla y Estructura de Inventario para Google Sheets (Sistema POS)

Copia y pega la siguiente tabla directamente en tu primera pestaña de **Google Sheets** (comenzando en la celda `A1`).

---

## 📊 Estructura de Columnas Completa

```tsv
SKU	CodigoBarras	Producto	Categoria	PrecioUnitario	PrecioCosto	ImpuestoIVA	Stock	UnidadMedida	Proveedor	Estado
SKU-1001	770123456701	Café Especial EAN 500g	Bebidas	24500	16000	19%	45	Bolsa	Cafeteros del Huila	Disponible
SKU-1002	770123456702	Agua Mineral Natural 600ml	Bebidas	3000	1800	19%	120	Botella	Manantiales Andes	Disponible
SKU-1003	770123456703	Snack Papas Artesanales 150g	Snacks	4500	2800	19%	80	Paquete	Agrícola Boyacá	Disponible
SKU-1004	770123456704	Chocolate Amargo 70% Kakao	Dulcería	6500	4200	19%	60	Barra	Cacao Santander	Disponible
SKU-1005	770123456705	Cuaderno Universitario EAN	Papelería	12000	7500	19%	150	Unidad	Editorial EAN	Disponible
SKU-1006	770123456706	Termo Acero Inoxidable 750ml	Accesorios	48000	31000	19%	25	Unidad	Importaciones Tech	Disponible
SKU-1007	770123456707	Bebida Energizante Citrus 355ml	Bebidas	5500	3600	19%	95	Lata	Distribuidora Central	Disponible
SKU-1008	770123456708	Galletas Integrales Avena & Miel	Snacks	3800	2300	19%	110	Paquete	Panificadora del Norte	Disponible
SKU-1009	770123456709	Mouse Inalámbrico Ergonómico	Tecnología	35000	22000	19%	18	Unidad	TechSupply Co	Disponible
SKU-1010	770123456710	Teclado Mecánico Compacto	Tecnología	115000	78000	19%	12	Unidad	TechSupply Co	Disponible
SKU-1011	770123456711	Camiseta Algodón EAN 2026	Ropa	38000	23000	19%	40	Unidad	Confecciones Colombia	Disponible
SKU-1012	770123456712	Gorra Deportiva Ajustable	Ropa	28000	17000	19%	35	Unidad	Confecciones Colombia	Disponible
SKU-1013	770123456713	Esfero Gel Azul 0.5mm (Caja x12)	Papelería	18000	11000	19%	70	Caja	Papelería Universal	Disponible
SKU-1014	770123456714	Audífonos Bluetooth Noise Cancelling	Tecnología	145000	95000	19%	8	Unidad	AudioPro Latam	Agotándose
SKU-1015	770123456715	Yogur Griego Frutos Rojos 200g	Lácteos	4200	2700	19%	50	Vaso	Lácteos del Valle	Disponible
SKU-1016	770123456716	Queso Mozzarella Tajado 400g	Lácteos	13500	9200	19%	30	Paquete	Lácteos del Valle	Disponible
SKU-1017	770123456717	Desinfectante Multiusos 1L	Limpieza	8500	5400	19%	65	Frasco	Químicos del Caribe	Disponible
SKU-1018	770123456718	Toallas de Papel Cocina (Pack x3)	Limpieza	9200	5900	19%	40	Pack	Papeles Nacionales	Disponible
```

---

## 📖 Instrucciones de Configuración en Google Sheets

1. Crea una nueva hoja en **[Google Sheets](https://sheets.google.com)**.
2. Selecciona la celda `A1` y pega el bloque TSV de arriba.
3. Asigna un nombre a tu hoja (ej. `Inventario POS Tienda EAN`).
4. Ve a **Archivo ➔ Compartir ➔ Publicar en la web**.
5. Selecciona formato **Valores separados por comas (.csv)** y haz clic en **Publicar**.
6. Copia la URL generada y pégala en la barra superior de tu sistema POS.
