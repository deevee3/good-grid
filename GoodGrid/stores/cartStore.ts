import { create } from 'zustand';
import { CartItem, Product, DeliveryWindow } from './types';

interface CartState {
  items: CartItem[];
  deliveryFee: number;
  serviceFeeRate: number;
  tip: number;
  tipType: 'percentage' | 'fixed';
  tipPercentage: number;
  selectedDeliveryWindow: DeliveryWindow | null;
  
  // Computed values
  itemCount: () => number;
  subtotal: () => number;
  serviceFee: () => number;
  tipAmount: () => number;
  total: () => number;
  
  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  setTip: (amount: number, type: 'percentage' | 'fixed') => void;
  setDeliveryWindow: (window: DeliveryWindow | null) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  deliveryFee: 4.99,
  serviceFeeRate: 0.05, // 5% service fee
  tip: 0,
  tipType: 'percentage',
  tipPercentage: 15,
  selectedDeliveryWindow: null,

  itemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  subtotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },

  serviceFee: () => {
    return get().subtotal() * get().serviceFeeRate;
  },

  tipAmount: () => {
    const state = get();
    if (state.tipType === 'percentage') {
      return state.subtotal() * (state.tipPercentage / 100);
    }
    return state.tip;
  },

  total: () => {
    const state = get();
    const deliveryFee = state.selectedDeliveryWindow?.fee ?? state.deliveryFee;
    return state.subtotal() + deliveryFee + state.serviceFee() + state.tipAmount();
  },

  addItem: (product: Product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { product, quantity }],
      };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  },

  incrementQuantity: (productId: string) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },

  decrementQuantity: (productId: string) => {
    const item = get().items.find((i) => i.product.id === productId);
    if (item && item.quantity <= 1) {
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  },

  setTip: (amount: number, type: 'percentage' | 'fixed') => {
    set({
      tip: type === 'fixed' ? amount : 0,
      tipType: type,
      tipPercentage: type === 'percentage' ? amount : 15,
    });
  },

  setDeliveryWindow: (window: DeliveryWindow | null) => {
    set({ selectedDeliveryWindow: window });
  },

  clearCart: () => {
    set({
      items: [],
      tip: 0,
      tipType: 'percentage',
      tipPercentage: 15,
      selectedDeliveryWindow: null,
    });
  },
}));
