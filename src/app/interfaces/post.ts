export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
}
