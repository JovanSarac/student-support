import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { Club, ClubStatus } from 'src/app/shared/model/club.model';
import {
  Membership,
  MembershipStatus,
} from 'src/app/shared/model/membership.model';
import { Person } from 'src/app/shared/model/person.model';
import { ClubsService } from '../clubs.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from '../../events/events.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { marked } from 'marked';

@Component({
  selector: 'app-single-club-page',
  templateUrl: './single-club-page.component.html',
  styleUrl: './single-club-page.component.css',
})
export class SingleClubPageComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  clubId: number = 0;
  membershipCount: number = 0;
  isLoading: boolean = false;
  clubIdForLoader: number = 0;
  user!: User;
  isAuthor: boolean = false;
  isCollapsed: boolean = false;
  isDescriptionCollapsed: boolean = false;
  membership: Membership = {
    id: 0,
    clubId: 0,
    enrollmentDate: new Date(),
    status: MembershipStatus.Member,
    memberId: 0,
  };

  memberships: Membership[] = [];

  club: Club = {
    id: 0,
    address: '',
    description: '',
    eventIds: [],
    latitude: 0,
    longitude: 0,
    name: '',
    status: ClubStatus.Active,
    ownerId: 0,
    memberships: [],
    coverImage: '',
  };

  author: Person = {
    id: 0,
    name: '',
    surname: '',
    userId: 0,
    email: '',
    profilePic: '',
  };

  constructor(
    private route: ActivatedRoute,
    private service: ClubsService,
    private authService: AuthService,
    private eventService: EventsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.clubId = Number(this.route.snapshot.paramMap.get('clubId'));
    this.getLoggedUser();
    this.getClubById();
  }

  getClubById(): void {
    this.service.getClubById(this.user, this.clubId).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.getAuthor();
        this.checkIfUserIsAuthorOfClub();
      },
    });
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      // if (user.role === 'student') this.getParticipationsByStudentId();
    });
  }

  getAuthor(): void {
    this.eventService.getPersonById(this.user, this.club.ownerId).subscribe({
      next: (result: Person) => {
        this.author = result;
      },
    });
  }

  getMembershipCount(): number {
    return this.club.memberships.filter((m) => m.status === 0).length;
  }

  joinClub(): void {
    this.isLoading = true;
    this.clubIdForLoader = this.clubId;
    this.membership.clubId = this.clubId;
    this.membership.memberId = this.user.id;
    this.service.createMembership(this.membership).subscribe({
      next: (result: Membership) => {
        this.isLoading = false;
        this.clubIdForLoader = 0;
        this.getClubById();
        this.toastrService.success(
          'Uspešno ste se prikljucili klubu: ' + this.club.name,
          'Uspešno',
          {
            timeOut: 10000,
            extendedTimeOut: 2000,
            closeButton: true,
            progressBar: true,
            enableHtml: true,
          }
        );
      },
    });
  }

  leaveClub(): void {
    const leftMembership = this.club.memberships.find(
      (m) =>
        m.memberId === this.user.id &&
        m.clubId === this.clubId &&
        m.status === MembershipStatus.Member
    );

    this.service.leaveClub(leftMembership?.id!).subscribe({
      next: (result: Membership) => {
        this.getClubById();
        this.toastrService.success(
          'Uspešno ste napustili klub sa imenom: ' + this.club.name + '!',
          'Uspešno',
          {
            timeOut: 4000,
            extendedTimeOut: 2000,
            closeButton: true,
            progressBar: true,
          }
        );
      },
    });
  }

  closeClub(): void {
    this.service.closeClub(this.clubId).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.toastrService.success('Uspešno ste zatvorili klub.', 'Uspešno', {
          timeOut: 4000, // Trajanje u milisekundama, ovde 10 sekundi
          extendedTimeOut: 2000, // Vreme produžetka ako korisnik pređe mišem preko toast-a
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }

  reactivateClub(): void {
    this.service.reactivateClub(this.clubId).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.toastrService.success(
          'Uspešno ste ponovo otvorili klub.',
          'Uspešno',
          {
            timeOut: 4000, // Trajanje u milisekundama, ovde 10 sekundi
            extendedTimeOut: 2000, // Vreme produžetka ako korisnik pređe mišem preko toast-a
            closeButton: true,
            progressBar: true,
          }
        );
      },
    });
  }

  closeClubByAdmin(): void {
    this.service.closeClubByAdmin(this.clubId).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.toastrService.success('Uspešno ste zatvorili klub.', 'Uspešno', {
          timeOut: 4000, // Trajanje u milisekundama, ovde 10 sekundi
          extendedTimeOut: 2000, // Vreme produžetka ako korisnik pređe mišem preko toast-a
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }

  checkIfUserIsAuthorOfClub(): void {
    if (this.user.role === 'author') {
      this.service
        .isAuthorOfClub(this.user, this.club.id, this.user.id)
        .subscribe({
          next: (result: boolean) => {
            this.isAuthor = result;
          },
        });
    }
  }

  isAlreadyCheckedJoined(): boolean {
    return this.club.memberships.some(
      (m) =>
        m.clubId === this.clubId &&
        (m.status === MembershipStatus.Member ||
          m.status === MembershipStatus.ClubAdmin) &&
        this.user.id === m.memberId
    );
  }

  shouldShowLoader(): boolean {
    if (this.clubIdForLoader === this.clubId) {
      return true;
    }
    return false;
  }

  setMarkerOnMap(): void {
    if (this.mapComponent) {
      this.mapComponent.addMarker(this.club.latitude, this.club.longitude);
      this.mapComponent.setView(this.club.latitude, this.club.longitude, 15);
    } else {
      console.log(this.mapComponent);
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.cdr.detectChanges();
    this.setMarkerOnMap();
  }

  toggleDescriptionCollapse() {
    this.isDescriptionCollapsed = !this.isDescriptionCollapsed;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  get convertedDescription() {
    return marked(this.club.description);
  }

  openEditClubPage(): void {
    this.router.navigate(['/edit-club', this.clubId]);
  }

  openProfile(): void {
    this.router.navigate(['/my-profile/' + this.author.id]);
  }
}
