import type { FeaturedStore, HomeCategory, HomeFeed } from '@/types/home';

export const categories: HomeCategory[] = [
  {
    id: 'beverages',
    title: 'Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1528823872057-9c018a7b9d6d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'snacks',
    title: 'Snack',
    imageUrl: 'https://images.unsplash.com/photo-1536300099515-6c61b290b654?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'seafood',
    title: 'Seafood',
    imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'dessert',
    title: 'Dessert',
    imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=800&auto=format&fit=crop',
  },
];

export const discounts: FeaturedStore[] = [
  {
    id: 'local-market',
    title: 'Findlay Market',
    distanceLabel: '1.0 km',
    ratingLabel: '4.8 reviews',
    imageUrl: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'fresh-produce',
    title: 'Baegopa Produce',
    distanceLabel: '500 m',
    ratingLabel: '4.8 reviews',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
  },
];

export const homeFeedSeed: HomeFeed = {
  categories,
  featuredStores: discounts,
};
