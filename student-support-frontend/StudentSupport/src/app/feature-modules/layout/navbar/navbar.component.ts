import { Component, HostListener, OnInit } from '@angular/core';
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
  isDropdownVisible: boolean = false;
  dropdownOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
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

  goToEvents(): void{
    if(this.user.username === ''){
      this.router.navigate(['/login'])
    }
    else{
      this.router.navigate(['/events-page'])
    }
  }

  goToClubs(): void{
    if(this.user.username === ''){
      this.router.navigate(['/login'])
    }
    else{
      this.router.navigate(['/'])
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

  loginClick(): void {
    this.router.navigate(['/login']);
  }

  checkScreenWidth() {
    this.isDropdownVisible = window.innerWidth <= 850;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      !(event.target as HTMLElement).closest('.burger-icon') &&
      !(event.target as HTMLElement).closest('.dropdown-content')
    ) {
      this.dropdownOpen = false;
    }
  }

  // isCurrentRoute(route: string): boolean {
  //   return this.router.url === route;
  // }
}
