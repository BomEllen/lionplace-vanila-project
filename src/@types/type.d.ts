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

export enum Type {
  Beauty = "beauty",
  Hospital = "hospital",
  Restaurant = "restaurant",
}
export interface Tag {
  collectionId: CollectionID;
  collectionName: CollectionName;
  created: Date;
  id: string;
  text: string;
  type: Type[];
  updated: Date;
}

export interface Place {
  address: string;
  collectionId: CollectionID;
  collectionName: CollectionName;
  created: Date;
  id: string;
  placeName: string;
  price: number;
  type: Type;
  updated: Date;
}

export interface Review {
  collectionId: string;
  collectionName: string;
  created: Date;
  id: string;
  img: string;
  place: string;
  tags: string[];
  text: string;
  updated: Date;
  userName: string;
}

export interface VisitRecord {
  collectionId: string;
  collectionName: string;
  created: Date;
  date: Date;
  id: string;
  isReviewRecord: boolean;
  place: string;
  review: string;
  updated: Date;
  userName: string;
}

export interface Theme {
  backgroundImage: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  id: string;
  reviews: string[];
  text: string;
  title: string;
  updated: Date;
  viewNumber: number;
}

export interface PostData {
  userImg: string;
  userName: string;
  image: string;
  text: string;
  date: string;
  reviewCount: number;
}

export interface VisitData {
  price: number;
  date: string;
  placeName: string;
  reviewText: string;
  reviewImg: string;
  reviewTags: string[];
}

export interface LikeKeywordData {
  keywordText: string;
}
