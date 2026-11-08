import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useCartStore, Product } from '@/stores';

const productData = {
  name: 'Organic Spinach Bundle',
  price: '$4.99',
  unit: 'bunch',
  vendor: 'Findlay Market',
  image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop',
  description:
    'Fresh, locally grown organic spinach. Perfect for salads, smoothies, or cooking. Harvested daily from local farms.',
  healthTags: ['Organic', 'Low Calorie', 'High Fiber', 'Local'],
  nutrition: {
    servingSize: '1 cup (30g)',
    calories: 7,
    protein: '0.9g',
    carbs: '1.1g',
    fiber: '0.7g',
    sugar: '0.1g',
    fat: '0.1g',
    sodium: '24mg',
    vitaminA: '56%',
    vitaminC: '14%',
    iron: '5%',
    calcium: '3%',
  },
  goodGridTags: [
    { label: 'Heart Healthy', icon: 'heart.fill', color: '#EF4444' },
    { label: 'High Fiber', icon: 'leaf.fill', color: Colors.light.primary },
    { label: 'Low Sodium', icon: 'drop.fill', color: '#3B82F6' },
  ],
  goodSwapAlternatives: [
    {
      id: '1',
      name: 'Baby Kale Mix',
      price: '$5.49',
      benefit: 'Even higher in iron',
      image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Arugula Bundle',
      price: '$4.49',
      benefit: 'More vitamin K',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop',
    },
  ],
};

function NutritionRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <View style={[styles.nutritionRow, highlight && styles.nutritionRowHighlight]}>
      <Text style={[styles.nutritionLabel, highlight && styles.nutritionLabelHighlight]}>{label}</Text>
      <Text style={[styles.nutritionValue, highlight && styles.nutritionValueHighlight]}>{value}</Text>
    </View>
  );
}

export default function ProductDetailScreen() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    const product: Product = {
      id: 'product-spinach-1',
      name: productData.name,
      price: parseFloat(productData.price.replace('$', '')),
      unit: productData.unit,
      image: productData.image,
      vendor: productData.vendor,
      vendorId: 'findlay-market',
      healthTags: productData.healthTags,
    };
    addItem(product, quantity);
    router.push('/cart');
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerImage}>
        <Image source={{ uri: productData.image }} style={styles.productImage} />
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
        {/* Product Info */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.vendorName}>{productData.vendor}</Text>
          <Text style={styles.productName}>{productData.name}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>{productData.price}</Text>
            <Text style={styles.productUnit}>/{productData.unit}</Text>
          </View>

          {/* Health Tags */}
          <View style={styles.healthTagsRow}>
            {productData.healthTags.map((tag) => (
              <View key={tag} style={styles.healthTag}>
                <Text style={styles.healthTagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.productDescription}>{productData.description}</Text>
        </View>

        {/* Good Grid Health Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Good Grid Health Benefits</Text>
          <View style={styles.goodGridTagsRow}>
            {productData.goodGridTags.map((tag) => (
              <View key={tag.label} style={styles.goodGridTag}>
                <View style={[styles.goodGridTagIcon, { backgroundColor: `${tag.color}20` }]}>
                  <IconSymbol name={tag.icon as any} size={16} color={tag.color} />
                </View>
                <Text style={styles.goodGridTagText}>{tag.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Nutrition Facts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nutrition Facts</Text>
          <View style={styles.nutritionCard}>
            <View style={styles.servingSizeRow}>
              <Text style={styles.servingSizeLabel}>Serving Size</Text>
              <Text style={styles.servingSizeValue}>{productData.nutrition.servingSize}</Text>
            </View>
            <View style={styles.caloriesRow}>
              <Text style={styles.caloriesLabel}>Calories</Text>
              <Text style={styles.caloriesValue}>{productData.nutrition.calories}</Text>
            </View>
            <View style={styles.nutritionDivider} />
            <NutritionRow label="Protein" value={productData.nutrition.protein} highlight />
            <NutritionRow label="Carbohydrates" value={productData.nutrition.carbs} />
            <NutritionRow label="Dietary Fiber" value={productData.nutrition.fiber} highlight />
            <NutritionRow label="Sugars" value={productData.nutrition.sugar} />
            <NutritionRow label="Fat" value={productData.nutrition.fat} />
            <NutritionRow label="Sodium" value={productData.nutrition.sodium} />
            <View style={styles.nutritionDivider} />
            <Text style={styles.vitaminsTitle}>Vitamins & Minerals</Text>
            <NutritionRow label="Vitamin A" value={productData.nutrition.vitaminA} />
            <NutritionRow label="Vitamin C" value={productData.nutrition.vitaminC} />
            <NutritionRow label="Iron" value={productData.nutrition.iron} />
            <NutritionRow label="Calcium" value={productData.nutrition.calcium} />
          </View>
        </View>

        {/* Good Swap Suggestions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Good Swap Alternatives</Text>
            <View style={styles.goodSwapBadge}>
              <IconSymbol name="sparkles" size={12} color={Colors.light.primary} />
              <Text style={styles.goodSwapBadgeText}>AI Suggested</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.swapRow}>
            {productData.goodSwapAlternatives.map((alt) => (
              <TouchableOpacity key={alt.id} style={styles.swapCard}>
                <Image source={{ uri: alt.image }} style={styles.swapImage} />
                <View style={styles.swapInfo}>
                  <Text style={styles.swapName} numberOfLines={1}>{alt.name}</Text>
                  <Text style={styles.swapBenefit}>{alt.benefit}</Text>
                  <Text style={styles.swapPrice}>{alt.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Add to Cart Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity style={styles.qtyButton} onPress={decrementQty}>
            <IconSymbol name="minus" size={16} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyButton} onPress={incrementQty}>
            <IconSymbol name="plus" size={16} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
          <Text style={styles.addToCartPrice}>
            ${(parseFloat(productData.price.replace('$', '')) * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 280,
    position: 'relative',
  },
  productImage: {
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
  productInfoContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  vendorName: {
    fontSize: 13,
    color: Colors.light.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
  },
  productUnit: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  healthTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  healthTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  healthTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 12,
  },
  goodGridTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  goodGridTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 8,
  },
  goodGridTagIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goodGridTagText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
  },
  nutritionCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
  },
  servingSizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  servingSizeLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  servingSizeValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
  },
  caloriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  caloriesLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  caloriesValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.primary,
  },
  nutritionDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  nutritionRowHighlight: {
    backgroundColor: '#E8F5E9',
    marginHorizontal: -8,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  nutritionLabelHighlight: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  nutritionValueHighlight: {
    color: Colors.light.primary,
  },
  vitaminsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  goodSwapBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  goodSwapBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  swapRow: {
    gap: 12,
  },
  swapCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  swapImage: {
    width: '100%',
    height: 80,
    backgroundColor: '#E0E0E0',
  },
  swapInfo: {
    padding: 10,
  },
  swapName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  swapBenefit: {
    fontSize: 11,
    color: Colors.light.primary,
    marginBottom: 4,
  },
  swapPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 16,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 4,
  },
  qtyButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    minWidth: 28,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  addToCartPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
