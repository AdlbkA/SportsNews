import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { News } from '../../models/news';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  news: News[] = [];

  constructor(private route: ActivatedRoute, private newsservice: NewsService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'];
      if (query) {
        this.searchNews(query);
      }
    });

  }

  searchNews(query: string): void {
    this.newsservice.searchNews(query).subscribe((news) => {
      this.news = news;
    })
  }

}
