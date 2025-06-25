export interface OrderProduct {
  productId: string;
  quantity: number;
}


export interface PaymentMethod {
  name: string;
  desc: string;
  isActive: boolean;
}


export interface ShippingMethod {
  name: string;
  desc: string;
  isActive: boolean;
}

export interface CreateOrderRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  products: OrderProduct[];
  paymentMethod: string;
  shippingMethod: string;
}