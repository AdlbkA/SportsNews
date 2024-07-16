import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category';
import { AuthService } from '../../network/auth/auth.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  categories!: Category[];  
  logged: boolean = false

  @ViewChild('searchForm') searchForm: any;

  constructor(private newsService: NewsService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.getCategories();
    this.auth.isLoggedIn.subscribe((data)=>{
      this.logged = data
    })
  }

  getCategories() {
    this.newsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSearch(query: string): void{
    this.router.navigate(['search'], {queryParams: {query}})
    this.searchForm.reset();
  }
  
  logout(){
    this.auth.logout()
  }

}