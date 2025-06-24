export interface OrderProduct {
  productId: string;
  quantity: number;
}


export interface PaymentMethod {
  name: string;
  description: string;
  isActive: boolean;
}


export interface ShippingMethod {
  name: string;
  description: string;
  price: number; 
  isActive: boolean;
}

export interface CreateOrderRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  products: OrderProduct[];
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
}