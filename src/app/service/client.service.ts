import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  public getUrlUsuario(username: string) {
    return this.http.get<any>(`https://dummyjson.com/users/filter?key=username&value=${username}`);
  }

  public getUrlPostsByUserId(userId: number) {
    return this.http.get<any>(`https://dummyjson.com/posts/user/${userId}`);
  }
  
  public getUrlCommentsByPostId(postId: number) {
    return this.http.get<any>(`https://dummyjson.com/comments/post/${postId}`);
  }

}
