import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  error: string | null = null;

  constructor (private auth: AuthService, private router: Router) {

  }

  onSubmit(form: NgForm){
    this.auth.register(form.value['username'], form.value['password']).subscribe((isSucced) => {
      if(isSucced) {
        this.router.navigate(['signin'])
      } else { 
        this.error = 'Username already taken'
      }
    })
  }
}
