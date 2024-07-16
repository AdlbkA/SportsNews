import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { News } from '../../models/news';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../network/auth/auth.service';


@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent implements OnInit{
  news!: News;
  comments?: Comment[];
  userId?: number;
  new!: number;
  comm_id?: number | null = null;
  comment!: Comment;
  logged: boolean = false


  constructor(private newsService: NewsService,
    private route: ActivatedRoute, private comm: CommentService, private auth: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.newsDetail();
    this.auth.isLoggedIn.subscribe((data)=>{
      this.logged = data
    })

    this.userId = Number(localStorage.getItem('user_id') ?? -1)
    const routeParams = this.route.snapshot.paramMap;
    this.comm_id = Number(routeParams.get('comm_id'))
    this.new = Number(routeParams.get('id'));
    this.comm.getAllComments(this.new).subscribe((data) => this.comments = data);

    if(this.comm_id){
      this.loadComment(Number(this.comm_id));
    } else {
      this.comment = {
        id: 0,
        author: "",
        post: 0,
        author_id: 0,
        content: "",
        createdDate: new Date()
    }
  }
}

  loadComment(id: number){
    this.comm.getCommentById(id).subscribe((data) => this.comment = data);
  }

  newsDetail(){
    this.route.paramMap.subscribe((params) => {
      const newsId: number = Number(params.get('id'))
      this.newsService.newsDetail(newsId).subscribe((news) => {
        this.news = news;
      })
    })
  }

  onSubmit(f: NgForm) {
    if(f.valid){
        this.comm.createComment(this.new!!, f.value["comment"]).subscribe({
          next: (res: any) => {
            window.location.reload()
          }
        });
      }
    }
  }