export interface Product {
	product_id: string;
	pyme_id: string;
	name: string;
	description: string;
	price: number;
	available: boolean;
	promotion?: number | null;
	stock: number;
	url_img: string;
	is_active: boolean;
	category_id: number | null;
}

export interface Category {
	category_id: number;
	name: string;
	description: string;
}

export interface ProductCategory {
	product_category_id: number;
	product_id: string;
	category_id: number;
}
	