export interface CreateComment {
  userId: string;
  threadId: number;
  userAvatar: string;
  btnText: string;
}

export interface notification {
  threadId: number;
  commentId: number;
  commentAuthor: User;
  threadAuthor: string;
  commentContent: string;
  createdAt: Date;
}
