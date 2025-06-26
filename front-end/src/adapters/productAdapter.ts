import { Product } from "../models/Products.models";

export interface RawProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  promotion?: string | null;
  stock: number;
  urlImg: string[];       // Diferente de Product.images
  createdAt: string;      // No existe en Product
  categories: string[];   // Diferente de Product.category
  pyme_id?: string;
}

export const adaptProduct = (raw: RawProduct): Product => {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    price: raw.price,
    category: raw.categories, // Convierte categories a category
    images: raw.urlImg,       // Convierte urlImg a images
    available: raw.available,
    promotion: raw.promotion ?? null,
    stock: raw.stock,
    pyme_id: raw.pyme_id ?? 'unknown-pyme',
  };
};