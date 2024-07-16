import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { BASE_URL } from '../const';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createNews(title: string, image: string, subtitle: string, content: string, category: number): Observable<any>{
    const payload = {
      'title': title,
      'image': image,
      'subtitle': subtitle,
      'content': content,
      'category': category,
    }

    return this.http.post(`${BASE_URL}/post/`, payload)

  }
}
