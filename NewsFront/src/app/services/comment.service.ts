import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BASE_URL } from '../const';
import { Comment } from '../models/comment';
import { CommentNetworkModel } from '../network/models/CommentNetworkModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(post_id: number, content: string): Observable<any>{
    const payload = {
      'content': content
    }
    return this.http.post(`${BASE_URL}/comments/${post_id}`, payload)
  }

  deleteComment(post_id: number): Observable<any>{
    return this.http.delete(`${BASE_URL}/comments/detail/${[post_id]}`)
  }


  getCommentById(comment_id: number): Observable<Comment>{
    return this.http.get<CommentNetworkModel>(`${BASE_URL}/comments/detail/${comment_id}`)
    .pipe(
      map((comm: CommentNetworkModel) => 
      ({
        id: comm.id,
        author: comm.author.username,
        post: comm.post,
        author_id: comm.author.id,
        content: comm.content,
        createdDate: new Date(comm.created_date)
      } as Comment)
      ))
  }


  getAllComments(post_id: number): Observable<Comment[]>{
    return this.http.get<CommentNetworkModel[]>(`${BASE_URL}/comments/${post_id}`).pipe(
      map((comments: CommentNetworkModel[]) => comments.map(comm => ({
        id: comm.id,
          author: comm.author.username,
          post: comm.post,
          author_id: comm.author.id,
          content: comm.content,
          createdDate: new Date(comm.created_date),
      } as Comment)
      ))
    )
  }


}
