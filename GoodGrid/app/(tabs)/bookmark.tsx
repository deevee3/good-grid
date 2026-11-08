import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

type FavoriteStore = {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: string;
  distance: string;
};

type FavoriteShopper = {
  id: string;
  name: string;
  image: string;
  deliveries: number;
  rating: string;
};

const favoriteStores: FavoriteStore[] = [
  {
    id: '1',
    name: 'Findlay Market',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=400&auto=format&fit=crop',
    category: 'Local Market',
    rating: '4.8',
    distance: '1.2 km',
  },
  {
    id: '2',
    name: 'Green Valley Farm',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop',
    category: 'Organic Farm',
    rating: '4.9',
    distance: '3.5 km',
  },
  {
    id: '3',
    name: 'Artisan Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop',
    category: 'Bakery',
    rating: '4.7',
    distance: '0.8 km',
  },
];

const favoriteShoppers: FavoriteShopper[] = [
  {
    id: '1',
    name: 'Sarah M.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    deliveries: 142,
    rating: '4.9',
  },
  {
    id: '2',
    name: 'Marcus T.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    deliveries: 89,
    rating: '4.8',
  },
];

function StoreCard({ store }: { store: FavoriteStore }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.storeCard}
      activeOpacity={0.7}
      onPress={() => router.push('/store-detail')}
    >
      <Image source={{ uri: store.image }} style={styles.storeImage} />
      <TouchableOpacity style={styles.heartButton}>
        <IconSymbol name="heart.fill" size={16} color="#EF4444" />
      </TouchableOpacity>
      <View style={styles.storeInfo}>
        <Text style={styles.storeName} numberOfLines={1}>{store.name}</Text>
        <Text style={styles.storeCategory}>{store.category}</Text>
        <View style={styles.storeFooter}>
          <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>{store.rating}</Text>
          </View>
          <Text style={styles.distanceText}>{store.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ShopperCard({ shopper }: { shopper: FavoriteShopper }) {
  return (
    <View style={styles.shopperCard}>
      <Image source={{ uri: shopper.image }} style={styles.shopperImage} />
      <View style={styles.shopperInfo}>
        <Text style={styles.shopperName}>{shopper.name}</Text>
        <Text style={styles.shopperDeliveries}>{shopper.deliveries} deliveries</Text>
      </View>
      <View style={styles.shopperRating}>
        <Text style={styles.starIcon}>⭐</Text>
        <Text style={styles.shopperRatingText}>{shopper.rating}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <IconSymbol name="heart.fill" size={18} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
}

export default function BookmarkScreen() {
  const [activeTab, setActiveTab] = useState<'stores' | 'shoppers'>('stores');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'stores' && styles.tabActive]}
          onPress={() => setActiveTab('stores')}
        >
          <Text style={[styles.tabText, activeTab === 'stores' && styles.tabTextActive]}>
            Stores ({favoriteStores.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'shoppers' && styles.tabActive]}
          onPress={() => setActiveTab('shoppers')}
        >
          <Text style={[styles.tabText, activeTab === 'shoppers' && styles.tabTextActive]}>
            Shoppers ({favoriteShoppers.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'stores' ? (
          <View style={styles.storesGrid}>
            {favoriteStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </View>
        ) : (
          <View style={styles.shoppersList}>
            {favoriteShoppers.map((shopper) => (
              <ShopperCard key={shopper.id} shopper={shopper} />
            ))}
          </View>
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
  storesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  storeCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  storeImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#E0E0E0',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  storeInfo: {
    padding: 12,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 2,
  },
  storeCategory: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  storeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.text,
  },
  distanceText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  shoppersList: {
    gap: 12,
  },
  shopperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
  },
  shopperImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  shopperInfo: {
    flex: 1,
    marginLeft: 12,
  },
  shopperName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 2,
  },
  shopperDeliveries: {
    fontSize: 13,
    color: '#6B7280',
  },
  shopperRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  shopperRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
