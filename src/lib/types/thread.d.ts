import { User } from "./user";

export interface Thread {
  id?: number;
  author: string;
  content: string;
  media: string | null;
  communityId: number | null;
}

export interface ThreadCard {
  id: number;
  currentUserId: string;
  author: User;
  content: string;
  media: string;
  likedBy: User[];
  communityId: number | null;
  parent?: ThreadCard;
  createdAt: Date;
  userInfo?: User;
  isComment?: boolean;
  child?: any[];
}

export interface CreateThread {
  user: User;
  btnText: string;
  currentThread?: Thread;
}
