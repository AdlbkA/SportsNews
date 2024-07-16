import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { BASE_URL } from '../../const';
import { JWTResponse } from './JWTResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private getToken = `${BASE_URL}/token/`
  private refreshToken = `${BASE_URL}/token/refresh`
  private request_url = `${BASE_URL}/user/all/`


  private loggedIn = new BehaviorSubject<boolean>(this.hasToken())

  isLoggedIn = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<boolean>{
    return this.http.post<JWTResponse>(this.getToken, {
      username: username,
      password: password
    }).pipe(
      map(tokens => {
        if(tokens.access && tokens.refresh) {
          localStorage.setItem('access', tokens.access);
          localStorage.setItem('refresh', tokens.refresh);
          localStorage.setItem('username', username)
          this.loggedIn.next(true); 
          return true;
        }
        this.loggedIn.next(false)
        return false
      })
    )
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post(this.request_url, {
      'username': username,
      'password': password
    }).pipe(
      map(() => {
        return true
      }),
      catchError(error => {
        console.log(error);
        console.error('Register failed:', error);
        return of(false);
      })
    )
  }

  logout() {
    localStorage.clear()
    this.loggedIn.next(false)
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('access') && !!localStorage.getItem('refresh')
  }
}
