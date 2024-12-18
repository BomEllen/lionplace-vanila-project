export interface User {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  emailVisibility: boolean;
  id: string;
  updated: Date;
  userName: string;
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
