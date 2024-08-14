import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../model/person.model';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user!: User;
  person: Person = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    profilePicBase64: '',
  };
  userRegister: boolean = false;
  isDropdownVisible: boolean = false;
  dropdownOpen = false;
  defaultProfilePic: string = '../../assets/images/profile-pic.jpg';
  menuVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      if (this.user.username != '') {
        this.userRegister = true;
        this.layoutService.loadPerson(this.user);
        this.layoutService.person$.subscribe((person) => {
          if (person) {
            this.person = person;
          }
        });
      } else {
        this.userRegister = false;
      }
    });
  }

  goToEvents(): void {
    if (this.user.username === '') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/events-page']);
    }
  }

  goToClubs(): void {
    if (this.user.username === '') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/']);
    }
  }

  goToMyProfile(): void {
    this.menuVisible = false;
    this.router.navigate(['/my-profile/' + this.user.id]);
  }

  goToAdminPanel(): void {
    this.router.navigate(['/admin-panel']);
  }

  goToReports(): void {
    this.router.navigate(['/reports']);
  }

  onLogout(): void {
    this.menuVisible = false;
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

    if (
      !(event.target as HTMLElement).closest('.pic-image') &&
      !(event.target as HTMLElement).closest('.profile-menu')
    ) {
      this.menuVisible = false;
    }
  }

  // isCurrentRoute(route: string): boolean {
  //   return this.router.url === route;
  // }

  vievMenu() {
    this.menuVisible = !this.menuVisible;
  }
}
