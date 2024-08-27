import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Club, ClubStatus } from 'src/app/shared/model/club.model';
import {
  Membership,
  MembershipStatus,
} from 'src/app/shared/model/membership.model';
import { ClubsService } from '../clubs.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Announcement } from 'src/app/shared/model/announcement.model';
import { EventsService } from '../../events/events.service';
import { Person } from 'src/app/shared/model/person.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnnouncementComponent } from '../create-announcement/create-announcement.component';
import { AnnouncementImageCarouselComponent } from 'src/app/shared/components/announcement-image-carousel/announcement-image-carousel.component';

declare var jQuery: any;

@Component({
  selector: 'app-announcements-view',
  templateUrl: './announcements-view.component.html',
  styleUrl: './announcements-view.component.css',
})
export class AnnouncementsViewComponent implements OnInit {
  @Input() clubIdInput: number = 0;

  isAuthor: boolean = false;
  isClubAdmin: boolean = false;
  isContentCollapsed: boolean = false;
  pagedAnnouncements: Announcement[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 5;
  members: Person[] = [];
  currentMembership: Membership = {
    id: 0,
    clubId: 0,
    enrollmentDate: new Date(),
    status: MembershipStatus.Member,
    memberId: 0,
  };
  user!: User;
  author: Person = {
    id: 0,
    email: '',
    name: '',
    surname: '',
    userId: 0,
  };

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
    categoryClub: '',
    coverImage: '',
    datePublication: new Date(),
    announcements: [],
  };

  constructor(
    private service: ClubsService,
    private authService: AuthService,
    private personService: EventsService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    this.user = this.authService.user$.value;
    this.getClubById();
  }

  getClubById(): void {
    this.service.getClubById(this.user, this.clubIdInput).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.getAuthor();
        this.checkIfUserIsAuthorOfClub();
        this.getCurrentUserMembership();
        this.getAllAnnouncementsPaged();
        this.getAllMembers();
      },
    });
  }

  getAllMembers(): void {
    this.service.getMembersByClubId(this.user, this.club.id).subscribe({
      next: (result: PagedResults<Person>) => {
        this.members = result.results;
      },
    });
  }

  getAuthor(): void {
    this.personService.getPersonById(this.user, this.club.ownerId).subscribe({
      next: (result: Person) => {
        this.author = result;
      },
    });
  }

  getCurrentUserMembership(): void {
    if (!this.isAuthor) {
      if (this.isMember()) {
        this.currentMembership = this.club.memberships.find(
          (m) =>
            m.memberId === this.user.id && m.status !== MembershipStatus.Left
        )!;
        if (this.currentMembership.status === MembershipStatus.ClubAdmin) {
          this.isClubAdmin = true;
        }
      }
    }
  }

  getAllAnnouncementsPaged(): void {
    const announcements = this.club.announcements.sort(
      (a, b) =>
        new Date(b.publicationDate).getTime() -
        new Date(a.publicationDate).getTime()
    );

    this.totalPages = Math.ceil(announcements.length / this.pageSize);
    this.updatePagedAnnouncements();
  }

  getAnnouncerInfos(memberId: number): string {
    if (memberId === this.author.id) {
      return this.author.name + ' ' + this.author.surname;
    }
    return (
      this.members.find((m) => m.id === memberId)?.name! +
      ' ' +
      this.members.find((m) => m.id === memberId)?.surname!
    );
  }

  getMembershipType(userId: number): string {
    if (this.author.id === userId) {
      return 'Vlasnik kluba';
    } else {
      return 'Administrator';
    }
  }

  updatePagedAnnouncements() {
    const announcements = this.club.announcements.sort(
      (a, b) =>
        new Date(b.publicationDate).getTime() -
        new Date(a.publicationDate).getTime()
    );
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedAnnouncements = announcements.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedAnnouncements();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedAnnouncements();
    }
  }

  deleteAnnouncement(announcementId: number): void {
    this.service.deleteAnnouncement(this.user, announcementId).subscribe({
      next: () => {
        this.getClubById();
        this.toastr.success('Uspešno!', 'Obrisali ste obaveštenje.');
      },
    });
  }

  isMember(): boolean {
    if (
      this.club.memberships.find(
        (m) => m.memberId === this.user.id && m.status !== 2
      ) !== undefined
    ) {
      return true;
    }
    return false;
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

  toggleContentCollapse() {
    this.isContentCollapsed = !this.isContentCollapsed;
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

  openProfile(userId: number): void {
    this.router.navigate(['/my-profile/' + userId]);
  }

  openCreateAnnouncementDialog(): void {
    let dialogRef = this.dialog.open(CreateAnnouncementComponent, {
      width: '70dvw',
      height: '87dvh',
      position: {
        top: '10dvh',
      },
      data: {
        mode: '',
        clubId: this.clubIdInput,
        announcementId: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getClubById();
    });
  }

  openEditAnnouncementDialog(announcementId: number): void {
    let dialogRef = this.dialog.open(CreateAnnouncementComponent, {
      width: '70dvw',
      height: '87dvh',
      position: {
        top: '10dvh',
      },
      data: {
        mode: 'edit-announcement',
        clubId: this.clubIdInput,
        announcementId: announcementId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getClubById();
    });
  }

  openImageCarouselDialog(images: string[]): void {
    let dialogRef = this.dialog.open(AnnouncementImageCarouselComponent, {
      width: '48dvw',
      height: '70dvh',
      position: {
        top: '10dvh',
      },
      data: images,
    });
  }
}
