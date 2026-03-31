import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './interfaces/user';
import { PostWithComments } from './interfaces/post-with-comments';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, UserInfoComponent, UserPostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  username: string = '';
  userFound: User | null = null;
  postsWithComments: PostWithComments[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  searchUser(): void {
    this.errorMessage = '';
    this.userFound = null;
    this.postsWithComments = [];

    if (this.username.trim() === '') {
      this.errorMessage = 'Debe escribir un username';
      return;
    }

    this.loading = true;

    this.http
      .get<any>(
        `https://dummyjson.com/users/filter?key=username&value=${this.username}`,
      )
      .subscribe({
        next: (response: any) => {
          if (!response?.users || response.users.length === 0) {
            this.errorMessage = 'Usuario no encontrado';
            this.loading = false;
            return;
          }

          const user = response.users[0];
          this.userFound = user;

          this.http
            .get<any>(`https://dummyjson.com/posts/user/${user.id}`)
            .subscribe({
              next: (postResponse: any) => {
                const posts = postResponse?.posts || [];

                if (posts.length === 0) {
                  this.postsWithComments = [];
                  this.loading = false;
                  return;
                }

                let loadedPosts = 0;

                posts.forEach((post: any) => {
                  this.http
                    .get<any>(`https://dummyjson.com/comments/post/${post.id}`)
                    .subscribe({
                      next: (commentResponse: any) => {
                        this.postsWithComments.push({
                          post: post,
                          comments: commentResponse?.comments || [],
                        });

                        loadedPosts++;

                        if (loadedPosts === posts.length) {
                          this.loading = false;
                        }
                      },
                      error: () => {
                        this.postsWithComments.push({
                          post: post,
                          comments: [],
                        });

                        loadedPosts++;

                        if (loadedPosts === posts.length) {
                          this.loading = false;
                        }
                      },
                    });
                });
              },
              error: () => {
                this.errorMessage = 'Error al cargar los posts';
                this.loading = false;
              },
            });
        },
        error: () => {
          this.errorMessage = 'Error al buscar el usuario';
          this.loading = false;
        },
      });
  }
}
