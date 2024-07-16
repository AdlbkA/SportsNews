import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './components/home/home.component';
import { NgIf } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { SigninComponent } from './network/auth/signin/signin.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CategoryComponent, TopBarComponent, HomeComponent, NgIf, NewsDetailComponent, FormsModule, SearchComponent, SigninComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NewsFront';
}
