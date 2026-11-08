import { create } from 'zustand';
import { User, DeliveryAddress, PaymentMethod } from './types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  addresses: DeliveryAddress[];
  paymentMethods: PaymentMethod[];
  defaultAddressId: string | null;
  defaultPaymentMethodId: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  
  // Address actions
  addAddress: (address: DeliveryAddress) => void;
  updateAddress: (id: string, address: Partial<DeliveryAddress>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDefaultAddress: () => DeliveryAddress | null;
  
  // Payment method actions
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  getDefaultPaymentMethod: () => PaymentMethod | null;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  addresses: [],
  paymentMethods: [],
  defaultAddressId: null,
  defaultPaymentMethodId: null,

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      addresses: [],
      paymentMethods: [],
      defaultAddressId: null,
      defaultPaymentMethodId: null,
    });
  },

  addAddress: (address: DeliveryAddress) => {
    set((state) => {
      const newAddresses = [...state.addresses, address];
      const defaultId = address.isDefault ? address.id : state.defaultAddressId;
      
      // If this is the first address or marked as default, set as default
      if (newAddresses.length === 1 || address.isDefault) {
        return {
          addresses: newAddresses.map((a) => ({
            ...a,
            isDefault: a.id === address.id,
          })),
          defaultAddressId: address.id,
        };
      }
      
      return { addresses: newAddresses };
    });
  },

  updateAddress: (id: string, updates: Partial<DeliveryAddress>) => {
    set((state) => ({
      addresses: state.addresses.map((address) =>
        address.id === id ? { ...address, ...updates } : address
      ),
    }));
  },

  removeAddress: (id: string) => {
    set((state) => {
      const newAddresses = state.addresses.filter((a) => a.id !== id);
      const needsNewDefault = state.defaultAddressId === id;
      
      return {
        addresses: newAddresses,
        defaultAddressId: needsNewDefault
          ? newAddresses[0]?.id ?? null
          : state.defaultAddressId,
      };
    });
  },

  setDefaultAddress: (id: string) => {
    set((state) => ({
      addresses: state.addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
      defaultAddressId: id,
    }));
  },

  getDefaultAddress: () => {
    const state = get();
    return state.addresses.find((a) => a.id === state.defaultAddressId) ?? null;
  },

  addPaymentMethod: (method: PaymentMethod) => {
    set((state) => {
      const newMethods = [...state.paymentMethods, method];
      
      if (newMethods.length === 1 || method.isDefault) {
        return {
          paymentMethods: newMethods.map((m) => ({
            ...m,
            isDefault: m.id === method.id,
          })),
          defaultPaymentMethodId: method.id,
        };
      }
      
      return { paymentMethods: newMethods };
    });
  },

  removePaymentMethod: (id: string) => {
    set((state) => {
      const newMethods = state.paymentMethods.filter((m) => m.id !== id);
      const needsNewDefault = state.defaultPaymentMethodId === id;
      
      return {
        paymentMethods: newMethods,
        defaultPaymentMethodId: needsNewDefault
          ? newMethods[0]?.id ?? null
          : state.defaultPaymentMethodId,
      };
    });
  },

  setDefaultPaymentMethod: (id: string) => {
    set((state) => ({
      paymentMethods: state.paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
      defaultPaymentMethodId: id,
    }));
  },

  getDefaultPaymentMethod: () => {
    const state = get();
    return (
      state.paymentMethods.find((m) => m.id === state.defaultPaymentMethodId) ??
      null
    );
  },
}));
