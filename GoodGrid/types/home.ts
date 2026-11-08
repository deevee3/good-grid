export type HomeCategory = {
  id: string;
  title: string;
  imageUrl: string;
};

export type FeaturedStore = {
  id: string;
  title: string;
  distanceLabel: string;
  ratingLabel: string;
  imageUrl: string;
};

export type HomeFeed = {
  categories: HomeCategory[];
  featuredStores: FeaturedStore[];
};
