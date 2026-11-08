import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

type OrderStatus = 'pending' | 'shopping' | 'on_the_way' | 'delivered';

type Order = {
  id: string;
  storeName: string;
  storeImage: string;
  date: string;
  itemCount: number;
  total: string;
  status: OrderStatus;
};

const orders: Order[] = [
  {
    id: '1',
    storeName: 'Findlay Market',
    storeImage: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=400&auto=format&fit=crop',
    date: 'Today, 2:30 PM',
    itemCount: 8,
    total: '$42.50',
    status: 'on_the_way',
  },
  {
    id: '2',
    storeName: 'Baegopa Produce',
    storeImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop',
    date: 'Yesterday',
    itemCount: 5,
    total: '$28.00',
    status: 'delivered',
  },
  {
    id: '3',
    storeName: 'Green Valley Farm',
    storeImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop',
    date: 'Dec 28, 2025',
    itemCount: 12,
    total: '$67.80',
    status: 'delivered',
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: '#F59E0B', bgColor: '#FEF3C7' },
  shopping: { label: 'Shopping', color: '#3B82F6', bgColor: '#DBEAFE' },
  on_the_way: { label: 'On the way', color: Colors.light.primary, bgColor: '#E8F5E9' },
  delivered: { label: 'Delivered', color: '#6B7280', bgColor: '#F3F4F6' },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];
  return (
    <View style={[styles.statusBadge, { backgroundColor: config.bgColor }]}>
      <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

function OrderCard({ order, onPress }: { order: Order; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.orderCard} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: order.storeImage }} style={styles.storeImage} />
      <View style={styles.orderInfo}>
        <View style={styles.orderHeader}>
          <Text style={styles.storeName}>{order.storeName}</Text>
          <StatusBadge status={order.status} />
        </View>
        <Text style={styles.orderDate}>{order.date}</Text>
        <View style={styles.orderFooter}>
          <Text style={styles.itemCount}>{order.itemCount} items</Text>
          <Text style={styles.orderTotal}>{order.total}</Text>
        </View>
      </View>
      <IconSymbol name="chevron.right" size={16} color="#C4C4C4" />
    </TouchableOpacity>
  );
}

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const historyOrders = orders.filter((o) => o.status === 'delivered');
  const displayOrders = activeTab === 'active' ? activeOrders : historyOrders;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            Active ({activeOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            History ({historyOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {displayOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <IconSymbol name="bag.fill" size={40} color="#C4C4C4" />
            </View>
            <Text style={styles.emptyTitle}>No {activeTab} orders</Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'active'
                ? 'Your active orders will appear here'
                : 'Your completed orders will appear here'}
            </Text>
          </View>
        ) : (
          displayOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={() => {
                if (order.status === 'on_the_way') {
                  router.push('/tracking');
                }
              }}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: Colors.light.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  storeImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  orderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  orderDate: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCount: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
