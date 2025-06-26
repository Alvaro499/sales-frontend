// Representa una Pyme con sus datos básicos de contacto y descripción
export interface Pyme {
  pymeName: string;
  email: string;
  phone?: string;
  address: string;
  description: string;
  userId: string;
}
