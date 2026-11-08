import { create } from 'zustand';
import { Order, DeliveryAddress, DeliveryWindow, PaymentMethod } from './types';
import { useCartStore } from './cartStore';

interface CheckoutState {
  selectedAddress: DeliveryAddress | null;
  selectedDeliveryWindow: DeliveryWindow | null;
  selectedPaymentMethod: PaymentMethod | null;
  specialInstructions: string;
}

interface OrderState {
  orders: Order[];
  activeOrder: Order | null;
  isLoading: boolean;
  checkout: CheckoutState;

  // Actions
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  setActiveOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  setLoading: (loading: boolean) => void;
  
  // Checkout actions
  setCheckoutAddress: (address: DeliveryAddress | null) => void;
  setCheckoutDeliveryWindow: (window: DeliveryWindow | null) => void;
  setCheckoutPaymentMethod: (method: PaymentMethod | null) => void;
  setSpecialInstructions: (instructions: string) => void;
  resetCheckout: () => void;
  
  // Create order from cart
  createOrderFromCart: () => Order | null;
}

const initialCheckoutState: CheckoutState = {
  selectedAddress: null,
  selectedDeliveryWindow: null,
  selectedPaymentMethod: null,
  specialInstructions: '',
};

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  activeOrder: null,
  isLoading: false,
  checkout: initialCheckoutState,

  setOrders: (orders: Order[]) => {
    set({ orders });
  },

  addOrder: (order: Order) => {
    set((state) => ({
      orders: [order, ...state.orders],
    }));
  },

  setActiveOrder: (activeOrder: Order | null) => {
    set({ activeOrder });
  },

  updateOrderStatus: (orderId: string, status: Order['status']) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ),
      activeOrder:
        state.activeOrder?.id === orderId
          ? { ...state.activeOrder, status, updatedAt: new Date().toISOString() }
          : state.activeOrder,
    }));
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setCheckoutAddress: (address: DeliveryAddress | null) => {
    set((state) => ({
      checkout: { ...state.checkout, selectedAddress: address },
    }));
  },

  setCheckoutDeliveryWindow: (window: DeliveryWindow | null) => {
    set((state) => ({
      checkout: { ...state.checkout, selectedDeliveryWindow: window },
    }));
  },

  setCheckoutPaymentMethod: (method: PaymentMethod | null) => {
    set((state) => ({
      checkout: { ...state.checkout, selectedPaymentMethod: method },
    }));
  },

  setSpecialInstructions: (instructions: string) => {
    set((state) => ({
      checkout: { ...state.checkout, specialInstructions: instructions },
    }));
  },

  resetCheckout: () => {
    set({ checkout: initialCheckoutState });
  },

  createOrderFromCart: () => {
    const state = get();
    const cartStore = useCartStore.getState();
    const { checkout } = state;

    if (
      !checkout.selectedAddress ||
      !checkout.selectedDeliveryWindow ||
      !checkout.selectedPaymentMethod ||
      cartStore.items.length === 0
    ) {
      return null;
    }

    const order: Order = {
      id: `order_${Date.now()}`,
      status: 'pending',
      items: cartStore.items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      subtotal: cartStore.subtotal(),
      deliveryFee: checkout.selectedDeliveryWindow.fee,
      serviceFee: cartStore.serviceFee(),
      tip: cartStore.tipAmount(),
      total: cartStore.total(),
      deliveryAddress: checkout.selectedAddress,
      deliveryWindow: checkout.selectedDeliveryWindow,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add the order and clear the cart
    get().addOrder(order);
    get().setActiveOrder(order);
    cartStore.clearCart();
    get().resetCheckout();

    return order;
  },
}));
