export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string[]; 
	urlImg: string[];
	available: boolean;
	promotion?: string | null;
	stock: number;
	pyme_id: string;
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
