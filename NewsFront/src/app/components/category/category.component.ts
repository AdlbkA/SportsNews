import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { News } from '../../models/news';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  
  news!: News[]

  constructor(private newsService: NewsService,
    private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.getNewsByCategory();
  }

  getNewsByCategory(){
    this.route.paramMap.subscribe((params) => {
      const categoryId: number = Number(params.get('id'))
      this.newsService.getNewsByCategory(categoryId).subscribe((news) => {
        this.news = news
      })
    })
  }
}
