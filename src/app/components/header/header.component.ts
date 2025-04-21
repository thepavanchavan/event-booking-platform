import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any = null;
  constructor(private authService: AuthService) {
    const session = localStorage.getItem('user_session');
    this.user = session ? JSON.parse(session) : null;
  }

  logout() {
    this.authService.logout();
  }

}
