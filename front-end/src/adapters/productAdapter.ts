import { Product } from "../models/Products.models";

// Interfaz que representa un producto en el formato recibido desde el backend,
// con propiedades que pueden diferir del modelo interno `Product`.
export interface RawProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  promotion?: string | null;
  stock: number;
  urlImg: string[];       // Imágenes en formato diferente a `Product.images`
  createdAt: string;      // Fecha de creación, no presente en `Product`
  categories: string[];   // Categorías en formato distinto a `Product.category`
  pyme_id?: string;
}

// Función que adapta un objeto `RawProduct` al formato `Product` usado internamente,
// realizando conversiones de nombres y asignando valores por defecto cuando es necesario.
export const adaptProduct = (raw: RawProduct): Product => {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    price: raw.price,
    category: raw.categories, // Convierte `categories` a `category`
    images: raw.urlImg,       // Convierte `urlImg` a `images`
    available: raw.available,
    promotion: raw.promotion ?? null,
    stock: raw.stock,
    pyme_id: raw.pyme_id ?? 'unknown-pyme', // Valor por defecto si no existe
  };
};
