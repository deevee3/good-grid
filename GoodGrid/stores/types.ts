// Core types for the store

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  vendor: string;
  vendorId: string;
  healthTags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface DeliveryWindow {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  fee: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  status: 'pending' | 'confirmed' | 'shopping' | 'delivering' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tip: number;
  total: number;
  deliveryAddress: DeliveryAddress;
  deliveryWindow: DeliveryWindow;
  createdAt: string;
  updatedAt: string;
  shopperId?: string;
  shopperName?: string;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  healthPreferences?: string[];
  dietaryRestrictions?: string[];
}
