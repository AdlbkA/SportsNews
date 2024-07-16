import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { NewsService } from '../../services/news.service';
import { PostService } from '../../services/post.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../../network/auth/auth.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {

  categories!: Category[];
  logged: boolean = false

  constructor(private router: Router, private service: NewsService, private api: PostService, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.auth.isLoggedIn.subscribe((data) => {
      this.logged = data
    })
    this.getCategories();
  }

  getCategories(){
    this.service.getCategories().subscribe((category) => {
      this.categories = category
    })
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.api.createNews(form.value['title'], form.value['image'], form.value['subtitle'], form.value['content'], form.value['category'].id).subscribe({next: (res: any) => {
        this.router.navigate(['home'])
      }})
    }
    
  }

}
