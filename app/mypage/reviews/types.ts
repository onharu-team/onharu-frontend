export interface ReviewsData {
  reviews: Review[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export interface Review {
  id: number;
  childId: number;
  storeId: number;
  reservationId: number;
  name: string;
  content: string;
  createAt: string;
}
