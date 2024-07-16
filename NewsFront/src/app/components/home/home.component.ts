import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { News } from '../../models/news';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  news: News[] = [];

  constructor(private service: NewsService){

  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    this.service.getNews().subscribe((news) => {
      this.news = news;
    })
  }

  updateNews(news: News[]){
    this.news = news;
  }
}
