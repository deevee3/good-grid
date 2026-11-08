import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { fetchHomeFeed } from '@/services/homeFeedService';
import type { FeaturedStore, HomeCategory } from '@/types/home';

import { homeFeedSeed } from './home.data';
import { styles } from './home.styles';

export default function HomeScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<HomeCategory[]>(homeFeedSeed.categories);
  const [featuredStores, setFeaturedStores] = useState<FeaturedStore[]>(homeFeedSeed.featuredStores);
  const [isHomeFeedLoading, setIsHomeFeedLoading] = useState(false);
  const [homeFeedError, setHomeFeedError] = useState<string | null>(null);

  const loadHomeFeed = useCallback(async () => {
    setIsHomeFeedLoading(true);
    setHomeFeedError(null);

    try {
      const homeFeed = await fetchHomeFeed();

      if (homeFeed.categories.length > 0) {
        setCategories(homeFeed.categories);
      }

      if (homeFeed.featuredStores.length > 0) {
        setFeaturedStores(homeFeed.featuredStores);
      }
    } catch (error) {
      setHomeFeedError(
        error instanceof Error
          ? error.message
          : 'Live store sync unavailable. Add EXPO_PUBLIC_API_BASE_URL and verify /v1/home-feed.'
      );
    } finally {
      setIsHomeFeedLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHomeFeed();
  }, [loadHomeFeed]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View style={styles.locationGroup}>
            <View style={styles.locationIconContainer}>
              <IconSymbol name="location.fill" size={16} color={Colors.light.primary} />
            </View>
            <View>
              <Text style={styles.locationLabel}>Current location</Text>
              <Text style={styles.locationValue} numberOfLines={1}>
                Cincinnati, OH
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('../cart')}>
            <IconSymbol name="bell.fill" size={22} color={Colors.light.text} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <IconSymbol name="magnifyingglass" size={18} color="#9AA0A6" />
            <TextInput
              placeholder="Search markets, items, or categories"
              placeholderTextColor="#9AA0A6"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <IconSymbol name="slider.horizontal.3" size={18} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        {isHomeFeedLoading ? (
          <View style={styles.syncBanner}>
            <ActivityIndicator size="small" color={Colors.light.primary} />
            <Text style={styles.syncBannerText}>Syncing live store data...</Text>
          </View>
        ) : null}

        {homeFeedError ? (
          <TouchableOpacity style={styles.syncBannerError} onPress={() => void loadHomeFeed()} activeOpacity={0.8}>
            <IconSymbol name="arrow.clockwise" size={14} color="#DC2626" />
            <Text style={styles.syncBannerErrorText} numberOfLines={2}>
              {homeFeedError}
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity style={styles.promoCard} activeOpacity={0.9} onPress={() => router.push('../tracking')}>
          <View style={styles.promoLeft}>
            <Text style={styles.promoTitle}>Good Grid weekly pick</Text>
            <Text style={styles.promoSubtitle}>Claim your 30% discount daily now!</Text>
            <View style={styles.promoCtaRow}>
              <View style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Order now</Text>
              </View>
            </View>
          </View>
          <View style={styles.promoRight}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop' }}
              style={styles.promoImage}
            />
            <View style={styles.promoDots}>
              <View style={[styles.promoDot, styles.promoDotActive]} />
              <View style={styles.promoDot} />
              <View style={styles.promoDot} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryItem} activeOpacity={0.9}>
              <View style={styles.categoryImageContainer}>
                <Image source={{ uri: cat.imageUrl }} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Top Discount</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.discountsRow}>
          {featuredStores.map((d) => (
            <TouchableOpacity key={d.id} style={styles.discountCard} activeOpacity={0.9}>
              <Image source={{ uri: d.imageUrl }} style={styles.discountImage} />
              <View style={styles.discountMeta}>
                <Text style={styles.discountTitle} numberOfLines={1}>
                  {d.title}
                </Text>
                <View style={styles.discountSubRow}>
                  <Text style={styles.discountSubText}>{d.distanceLabel}</Text>
                  <Text style={styles.discountDot}>•</Text>
                  <Text style={styles.discountSubText}>⭐ {d.ratingLabel}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
