import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news';
import { Category } from '../models/category';
import { BASE_URL } from '../const';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private client: HttpClient) { }

  getNews(): Observable<News[]> {
    return this.client.get<News[]>(`${BASE_URL}/news`)
  }

  getCategories(): Observable<Category[]> {
    return this.client.get<Category[]>(`${BASE_URL}/categories`)
  }

  getNewsByCategory(id: number): Observable<News[]> {
    return this.client.get<News[]>(`${BASE_URL}/news_category/${id}`)
  }

  newsDetail(id:number): Observable<News>{
    return this.client.get<News>(`${BASE_URL}/news/${id}`)
  }

  searchNews(query: string):Observable<News[]>{
    return this.client.get<News[]>(`${BASE_URL}/search/?query=${query}`)
  }
}
