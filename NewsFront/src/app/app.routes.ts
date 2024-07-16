import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { SearchComponent } from './components/search/search.component';

import { PostComponent } from './components/post/post.component';
import { SigninComponent } from './network/auth/signin/signin.component';
import { SignupComponent } from './network/auth/signup/signup.component';


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'category/:id', component: CategoryComponent},
    {path: 'news/:id', component: NewsDetailComponent},
    {path: 'search', component: SearchComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'post', component: PostComponent}
];