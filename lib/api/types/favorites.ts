export interface FavoriteStore {
  id: number;
  childId: number;
  storeId: number;
  storeName: string;
  image: string[];
  address: string;
  isShare: boolean;
}

export interface FavoritesResponse {
  favorites: FavoriteStore[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}
