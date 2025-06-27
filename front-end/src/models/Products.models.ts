// Representa un producto con sus detalles principales
export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string[];
	images: string[];
	available: boolean;
	promotion?: string | null;
	stock: number;
	pyme_id: string;
	active?: boolean;
}

// Representa una categoría de productos
export interface Category {
	category_id: number;
	name: string;
	description: string;
}

// Relación entre productos y categorías
export interface ProductCategory {
	product_category_id: number;
	product_id: string;
	category_id: number;
}

// Extiende Product para representar un producto en el carrito con cantidad
export interface CartItem extends Product {
  quantity: number;
}
