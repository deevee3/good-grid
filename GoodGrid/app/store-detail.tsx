import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

type Product = {
  id: string;
  name: string;
  price: string;
  unit: string;
  image: string;
  healthTags: string[];
  category: string;
};

const storeInfo = {
  name: 'Findlay Market',
  image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=800&auto=format&fit=crop',
  category: 'Local Market',
  rating: '4.8',
  reviews: 234,
  distance: '1.2 km',
  deliveryTime: '25-35 min',
  description: 'Historic public market featuring local produce, artisan foods, and specialty goods from Cincinnati vendors.',
  hours: 'Open until 6:00 PM',
};

const categories = ['All', 'Produce', 'Dairy', 'Bakery', 'Meat', 'Pantry'];

const products: Product[] = [
  {
    id: '1',
    name: 'Organic Spinach Bundle',
    price: '$4.99',
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=400&auto=format&fit=crop',
    healthTags: ['Organic', 'Low Cal'],
    category: 'Produce',
  },
  {
    id: '2',
    name: 'Farm Fresh Eggs',
    price: '$6.50',
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1569288052389-dac9b0ac9eac?q=80&w=400&auto=format&fit=crop',
    healthTags: ['Free Range', 'Local'],
    category: 'Dairy',
  },
  {
    id: '3',
    name: 'Sourdough Bread',
    price: '$7.00',
    unit: 'loaf',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop',
    healthTags: ['Artisan'],
    category: 'Bakery',
  },
  {
    id: '4',
    name: 'Local Honey',
    price: '$12.00',
    unit: '16 oz',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=400&auto=format&fit=crop',
    healthTags: ['Raw', 'Local'],
    category: 'Pantry',
  },
  {
    id: '5',
    name: 'Heirloom Tomatoes',
    price: '$5.99',
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1546470427-227c7c5f5fdc?q=80&w=400&auto=format&fit=crop',
    healthTags: ['Organic', 'Local'],
    category: 'Produce',
  },
  {
    id: '6',
    name: 'Grass-Fed Ground Beef',
    price: '$9.99',
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=400&auto=format&fit=crop',
    healthTags: ['Grass-Fed', 'Local'],
    category: 'Meat',
  },
];

function ProductCard({ product, onPress }: { product: Product; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <View style={styles.healthTagsRow}>
          {product.healthTags.slice(0, 2).map((tag) => (
            <View key={tag} style={styles.healthTag}>
              <Text style={styles.healthTagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>{product.price}</Text>
          <Text style={styles.productUnit}>/{product.unit}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <IconSymbol name="plus" size={18} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function StoreDetailScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFavorite, setIsFavorite] = useState(false);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerImage}>
        <Image source={{ uri: storeInfo.image }} style={styles.coverImage} />
        <SafeAreaView style={styles.headerOverlay}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="arrow.left" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <IconSymbol
              name={isFavorite ? 'heart.fill' : 'heart'}
              size={20}
              color={isFavorite ? '#EF4444' : '#fff'}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Store Info */}
        <View style={styles.storeInfoContainer}>
          <View style={styles.storeHeader}>
            <Text style={styles.storeName}>{storeInfo.name}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>{storeInfo.rating}</Text>
              <Text style={styles.reviewsText}>({storeInfo.reviews})</Text>
            </View>
          </View>

          <Text style={styles.storeCategory}>{storeInfo.category}</Text>
          <Text style={styles.storeDescription}>{storeInfo.description}</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <IconSymbol name="clock" size={16} color={Colors.light.primary} />
              <Text style={styles.infoText}>{storeInfo.deliveryTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol name="location" size={16} color={Colors.light.primary} />
              <Text style={styles.infoText}>{storeInfo.distance}</Text>
            </View>
            <View style={styles.infoItem}>
              <IconSymbol name="clock.fill" size={16} color={Colors.light.primary} />
              <Text style={styles.infoText}>{storeInfo.hours}</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <IconSymbol name="magnifyingglass" size={18} color="#9AA0A6" />
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="#9AA0A6"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => router.push('/product-detail')}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  storeInfoContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  reviewsText: {
    fontSize: 12,
    color: '#92400E',
    marginLeft: 2,
  },
  storeCategory: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  storeDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.text,
  },
  categoriesRow: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  categoryChipActive: {
    backgroundColor: Colors.light.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#E0E0E0',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 6,
    minHeight: 36,
  },
  healthTagsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  healthTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  healthTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  productUnit: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
