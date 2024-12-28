export interface User {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  emailVisibility: boolean;
  id: string;
  updated: Date;
  userName: string;
  email: string;
  verified: boolean;
}

export interface PostData {
  userImg: string;
  userName: string;
  image: string;
  text: string;
  date: string;
  reviewCount: number;
}


// 예약/주문 페이지-------------------------------
// GET 가격 데이터 타입 -----------------------

export interface UserData {
  userName: string;
  reservationCount: number;
  payCount: number;
}

type PlaceType = "hospital" | "restaurant" | "cafe" | "shop" | string; 

export interface PaginatedPlacesType {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: PlaceItemType[];
}

export interface PlaceItemType {
  collectionId: string;
  collectionName: string;
  id: string;
  placeName: string;
  price: number;
  type: PlaceType;
  address: string;
  created: string;
  updated: string;
}

// GET 유저데이터 타입 -----------------------
interface PaginatedVisitRecordsType {
  items: VisitRecordType[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

interface VisitRecordType {
  collectionId: string;
  collectionName: string;
  created: string;
  date: string;
  id: string;
  isReviewRecord: boolean;
  place: string;
  review: string;
  updated: string;
  userName: string;
}


// GET 리뷰데이터 타입 -----------------------
interface PaginatedReviewsType {
  items: ReviewItemType[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
interface ReviewItemType {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  img: string;
  place: string;
  tags: string[];
  text: string;
  updated: string;
  userName: string;
}

