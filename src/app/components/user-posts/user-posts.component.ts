import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostWithComments } from '../../interfaces/post-with-comments';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent {
  @Input() postsWithComments: PostWithComments[] = [];
}
