import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit{

  user !: User;

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
    });
  }

  checkScreenWidth() {
    this.isDropdownVisible = window.innerWidth <= 750;
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.burger-icon') && !(event.target as HTMLElement).closest('.dropdown-content')) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigate(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'događaji') {
      // navigacija na događaje
    } else if (selectedValue === 'funkcionalnosti') {
      // navigacija na funkcionalnosti
    } else if (selectedValue === 'faq') {
      // navigacija na FAQ
    } else if (selectedValue === 'o nama') {
      // navigacija na O nama
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  getCurrentRoute(): string{
    if(this.isCurrentRoute('/info-board')){
      return 'Početna';
    }

    if(this.isCurrentRoute('/events-page')){
      return 'Događaji';
    }
  
    return 'ABC';

  }

}
