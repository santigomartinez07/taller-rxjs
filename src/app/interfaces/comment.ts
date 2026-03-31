export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    username: string;
    fullName?: string;
  };
}
