import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user !: User;
  userRegister: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      console.log(this.user)
      if(this.user.username != ""){
        this.userRegister = true;
      }else {
        this.userRegister = false;
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}
