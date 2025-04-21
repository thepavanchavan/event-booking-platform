import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_URL = 'assets/users.json'
  private readonly SESSION_KEY = 'user_session'
  private loggedIn = new BehaviorSubject<boolean>(this.hasSession());
  isLoggedIn$ = this.loggedIn.asObservable()

  constructor(private http : HttpClient, private router:Router) { }

  private hasSession(): boolean {
    return localStorage.getItem(this.SESSION_KEY) !== null;
  }

  login(username:string, password:string):Promise<boolean>{
    return this.http.get<any[]>(this.USERS_URL).toPromise().then((users:any) =>{
      const user = users.find((u:any) => u.username === username && u.password === password);
      if(user){
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
        this.loggedIn.next(true);
        return true;
      }
      return false
    })
  }

  logout(){
    localStorage.removeItem(this.SESSION_KEY);
    this.loggedIn.next(false);
    this.router.navigate(['./login']);
  }
  
  isLoggedIn(){
    return this.hasSession();
  }
}
