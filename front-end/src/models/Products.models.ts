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
}
