import { requestJson } from '@/services/api/client';
import type { FeaturedStore, HomeCategory, HomeFeed } from '@/types/home';

type HomeFeedApiResponse = {
  categories?: unknown[];
  featuredStores?: unknown[];
  discounts?: unknown[];
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

function mapCategory(value: unknown, index: number): HomeCategory | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = asString(value.id) ?? asString(value.slug) ?? `category-${index}`;
  const title = asString(value.title) ?? asString(value.name);
  const imageUrl =
    asString(value.imageUrl) ?? asString(value.image_url) ?? asString(value.image) ?? asString(value.thumbnailUrl);

  if (!title || !imageUrl) {
    return null;
  }

  return {
    id,
    title,
    imageUrl,
  };
}

function mapFeaturedStore(value: unknown, index: number): FeaturedStore | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = asString(value.id) ?? asString(value.slug) ?? `store-${index}`;
  const title = asString(value.title) ?? asString(value.name);
  const imageUrl =
    asString(value.imageUrl) ?? asString(value.image_url) ?? asString(value.image) ?? asString(value.heroImageUrl);

  if (!title || !imageUrl) {
    return null;
  }

  const distanceLabel = asString(value.distanceLabel) ?? asString(value.distance_label) ?? 'Nearby';
  const ratingLabel =
    asString(value.ratingLabel) ??
    asString(value.rating_label) ??
    (typeof value.rating === 'number' ? `${value.rating.toFixed(1)} rating` : 'Top rated');

  return {
    id,
    title,
    distanceLabel,
    ratingLabel,
    imageUrl,
  };
}

export async function fetchHomeFeed(): Promise<HomeFeed> {
  const response = await requestJson<HomeFeedApiResponse>('/v1/home-feed');
  const categories = (response.categories ?? []).map(mapCategory).filter((value): value is HomeCategory => !!value);
  const featuredStoresSource = response.featuredStores ?? response.discounts ?? [];
  const featuredStores = featuredStoresSource
    .map(mapFeaturedStore)
    .filter((value): value is FeaturedStore => !!value);

  if (categories.length === 0 && featuredStores.length === 0) {
    throw new Error('Home feed endpoint returned no usable live data.');
  }

  return {
    categories,
    featuredStores,
  };
}
