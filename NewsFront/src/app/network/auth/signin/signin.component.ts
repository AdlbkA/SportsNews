import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';
import { of } from 'rxjs';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  logged: boolean = false;
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.auth.isLoggedIn = of(false)
  }

  onSubmit(form: NgForm) {
    this.auth.login(form.value["username"], form.value["password"]).subscribe((isLogged) => {
      if (isLogged) {
        this.router.navigate(['/']);
      } else {
        this.error = "Invalid username or password";
      }
    });
  }

}
