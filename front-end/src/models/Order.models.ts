// Representa un producto dentro de un pedido
export interface OrderProduct {
  productId: string;
  quantity: number;
}

// Describe un método de pago disponible
export interface PaymentMethod {
  name: string;
  desc: string;
  isActive: boolean;
}

// Describe un método de envío disponible
export interface ShippingMethod {
  name: string;
  desc: string;
  isActive: boolean;
}

// Datos necesarios para crear un pedido
export interface CreateOrderRequest {
  guestUserId?: string;
  buyerType: 'CLIENT' | 'USER';
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  products: OrderProduct[];
  shippingMethod: string;
  paymentMethod: string;
}
