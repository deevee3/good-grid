import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useCartStore, useOrderStore, useUserStore, DeliveryWindow, DeliveryAddress, PaymentMethod } from '@/stores';

const MOCK_DELIVERY_WINDOWS: DeliveryWindow[] = [
  { id: '1', date: 'Today', startTime: '2:00 PM', endTime: '4:00 PM', fee: 5.99 },
  { id: '2', date: 'Today', startTime: '4:00 PM', endTime: '6:00 PM', fee: 4.99 },
  { id: '3', date: 'Today', startTime: '6:00 PM', endTime: '8:00 PM', fee: 3.99 },
  { id: '4', date: 'Tomorrow', startTime: '10:00 AM', endTime: '12:00 PM', fee: 2.99 },
  { id: '5', date: 'Tomorrow', startTime: '12:00 PM', endTime: '2:00 PM', fee: 2.99 },
];

const MOCK_ADDRESS: DeliveryAddress = {
  id: 'addr-1',
  label: 'Home',
  street: '123 Main Street',
  city: 'Cincinnati',
  state: 'OH',
  zip: '45202',
  isDefault: true,
};

const MOCK_PAYMENT: PaymentMethod = {
  id: 'pm-1',
  type: 'card',
  last4: '4242',
  brand: 'Visa',
  isDefault: true,
};

function SectionCard({ 
  title, 
  icon, 
  children, 
  onEdit 
}: { 
  title: string; 
  icon: string; 
  children: React.ReactNode;
  onEdit?: () => void;
}) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <IconSymbol name={icon as any} size={18} color={Colors.light.primary} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {onEdit && (
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { subtotal, serviceFee, tipAmount, total, items, setDeliveryWindow, selectedDeliveryWindow, deliveryFee } = useCartStore();
  const { setCheckoutAddress, setCheckoutDeliveryWindow, setCheckoutPaymentMethod, createOrderFromCart } = useOrderStore();
  
  const [selectedWindow, setSelectedWindow] = useState<DeliveryWindow | null>(MOCK_DELIVERY_WINDOWS[1]);
  const [address] = useState<DeliveryAddress>(MOCK_ADDRESS);
  const [payment] = useState<PaymentMethod>(MOCK_PAYMENT);

  const handleSelectWindow = (window: DeliveryWindow) => {
    setSelectedWindow(window);
    setDeliveryWindow(window);
  };

  const handlePlaceOrder = () => {
    if (!selectedWindow) return;
    
    setCheckoutAddress(address);
    setCheckoutDeliveryWindow(selectedWindow);
    setCheckoutPaymentMethod(payment);
    
    const order = createOrderFromCart();
    if (order) {
      router.replace('/order-confirmation');
    }
  };

  const currentDeliveryFee = selectedWindow?.fee ?? deliveryFee;
  const orderTotal = subtotal() + currentDeliveryFee + serviceFee() + tipAmount();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconSymbol name="arrow.left" size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <SectionCard title="Delivery Address" icon="location.fill" onEdit={() => {}}>
          <View style={styles.addressContent}>
            <Text style={styles.addressLabel}>{address.label}</Text>
            <Text style={styles.addressText}>{address.street}</Text>
            <Text style={styles.addressText}>{address.city}, {address.state} {address.zip}</Text>
          </View>
        </SectionCard>

        {/* Delivery Window */}
        <SectionCard title="Delivery Window" icon="clock.fill">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.windowsScroll}>
            {MOCK_DELIVERY_WINDOWS.map((window) => (
              <TouchableOpacity
                key={window.id}
                style={[
                  styles.windowCard,
                  selectedWindow?.id === window.id && styles.windowCardSelected,
                ]}
                onPress={() => handleSelectWindow(window)}
              >
                <Text style={[
                  styles.windowDate,
                  selectedWindow?.id === window.id && styles.windowTextSelected,
                ]}>
                  {window.date}
                </Text>
                <Text style={[
                  styles.windowTime,
                  selectedWindow?.id === window.id && styles.windowTextSelected,
                ]}>
                  {window.startTime} - {window.endTime}
                </Text>
                <Text style={[
                  styles.windowFee,
                  selectedWindow?.id === window.id && styles.windowFeeSelected,
                ]}>
                  ${window.fee.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SectionCard>

        {/* Payment Method */}
        <SectionCard title="Payment Method" icon="creditcard.fill" onEdit={() => {}}>
          <View style={styles.paymentContent}>
            <View style={styles.cardIcon}>
              <IconSymbol name="creditcard" size={20} color={Colors.light.primary} />
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentBrand}>{payment.brand}</Text>
              <Text style={styles.paymentLast4}>•••• {payment.last4}</Text>
            </View>
          </View>
        </SectionCard>

        {/* Order Summary */}
        <SectionCard title="Order Summary" icon="list.bullet">
          <View style={styles.summaryContent}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items ({items.length})</Text>
              <Text style={styles.summaryValue}>${subtotal().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>${currentDeliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee</Text>
              <Text style={styles.summaryValue}>${serviceFee().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tip</Text>
              <Text style={styles.summaryValue}>${tipAmount().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${orderTotal.toFixed(2)}</Text>
            </View>
          </View>
        </SectionCard>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.placeOrderButton, !selectedWindow && styles.placeOrderButtonDisabled]}
          onPress={handlePlaceOrder}
          disabled={!selectedWindow}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
          <Text style={styles.placeOrderPrice}>${orderTotal.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  scrollView: {
    flex: 1,
  },
  sectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  editButton: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  addressContent: {
    paddingLeft: 26,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  windowsScroll: {
    marginHorizontal: -8,
  },
  windowCard: {
    width: 110,
    padding: 12,
    marginHorizontal: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  windowCardSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: `${Colors.light.primary}10`,
  },
  windowDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  windowTime: {
    fontSize: 11,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  windowFee: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
  },
  windowTextSelected: {
    color: Colors.light.primary,
  },
  windowFeeSelected: {
    color: Colors.light.primary,
  },
  paymentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 26,
  },
  cardIcon: {
    width: 40,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentBrand: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  paymentLast4: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryContent: {
    paddingLeft: 26,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  placeOrderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  placeOrderButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  placeOrderPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
