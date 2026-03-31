import { Post } from './post';
import { Comment } from './comment';

export interface PostWithComments {
  post: Post;
  comments: Comment[];
}
