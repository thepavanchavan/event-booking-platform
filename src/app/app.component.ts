import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'event-booking-platform';
  isHeaderDisplay = false;
  constructor(private authService: AuthService) {};
  ngOnInit(){
     this.authService.isLoggedIn$.subscribe((status:any)=>{
      this.isHeaderDisplay = status;
     })
  }
}
