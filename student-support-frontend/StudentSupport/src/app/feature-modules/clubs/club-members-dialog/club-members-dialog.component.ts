import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Club, ClubStatus } from 'src/app/shared/model/club.model';
import { Person } from 'src/app/shared/model/person.model';
import { ClubsService } from '../clubs.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Router } from '@angular/router';
import {
  Membership,
  MembershipStatus,
} from 'src/app/shared/model/membership.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-club-members-dialog',
  templateUrl: './club-members-dialog.component.html',
  styleUrl: './club-members-dialog.component.css',
})
export class ClubMembersDialogComponent implements OnInit {
  @Output() membershipUpdated: EventEmitter<void> = new EventEmitter<void>();
  @Input() clubIdInput: number = 0;
  members: Person[] = [];
  memberships: Membership[] = [];
  user!: User;
  currentMembership: Membership = {
    id: 0,
    clubId: 0,
    enrollmentDate: new Date(),
    status: MembershipStatus.Member,
    memberId: 0,
  };

  isAuthor: boolean = false;
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
    datePublication: new Date(),
    announcements: [],
    categoryClub: ''
  };

  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: Club,
    private service: ClubsService,
    private authService: AuthService,
    private router: Router,
    // public dialogRef: MatDialogRef<ClubMembersDialogComponent>,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    this.user = this.authService.user$.value;
    this.getClubById();
  }

  getMembershipsForOverview(): void {
    if (this.isAuthor) {
      this.memberships = this.club.memberships;
      this.getCurrentUserMembership();
    } else {
      this.memberships = this.club.memberships.filter((m) => m.status !== 2);
      this.getCurrentUserMembership();
    }
  }

  getAllMembers(): void {
    this.service.getMembersByClubId(this.user, this.club.id).subscribe({
      next: (result: PagedResults<Person>) => {
        this.members = result.results;
      },
    });
  }

  getMembershipType(typeNumber: number): string {
    if (typeNumber === 0) {
      return 'Član';
    } else if (typeNumber === 1) {
      return 'Admin kluba';
    } else if (typeNumber === 2) {
      return 'Napustio';
    } else {
      return 'Suspendovan';
    }
  }

  getMemberName(memberId: number): string {
    return this.members.find((m) => m.id === memberId)?.name!;
  }

  getMemberSurname(memberId: number): string {
    return this.members.find((m) => m.id === memberId)?.surname!;
  }

  getCurrentUserMembership(): void {
    if (!this.isAuthor) {
      if (this.isMember()) {
        this.currentMembership = this.club.memberships.find(
          (m) =>
            m.memberId === this.user.id && m.status !== MembershipStatus.Left
        )!;
      }
    }
  }

  getClubById(): void {
    this.service.getClubById(this.user, this.clubIdInput).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.checkIfUserIsAuthorOfClub();
        this.getAllMembers();
      },
    });
  }

  suspendMembership(membershipId: number): void {
    this.service.suspendMembership(this.user, membershipId).subscribe({
      next: (result: Membership) => {
        this.membershipUpdated.emit();
        this.getClubById();
        this.toastrService.success(
          'Uspešno ste suspendovali člana kluba.',
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

  makeAMember(membershipId: number): void {
    this.service.makeAMember(this.user, membershipId).subscribe({
      next: (result: Membership) => {
        this.membershipUpdated.emit();
        this.getClubById();
        this.toastrService.success(
          'Uspešno ste dodelili ovom korisniku ulogu ČLAN.',
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

  promoteToClubAdmin(membershipId: number): void {
    this.service.promoteToClubAdmin(membershipId).subscribe({
      next: (result: Membership) => {
        this.membershipUpdated.emit();
        this.getClubById();
        this.toastrService.success(
          'Uspešno ste unapredili ovog člana kluba u ADMINA.',
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

  checkIfUserIsAuthorOfClub(): void {
    if (this.user.role === 'author') {
      this.service
        .isAuthorOfClub(this.user, this.club.id, this.user.id)
        .subscribe({
          next: (result: boolean) => {
            this.isAuthor = result;
            this.getMembershipsForOverview();
          },
        });
    } else {
      this.getMembershipsForOverview();
    }
  }

  isMember(): boolean {
    if (
      this.memberships.find(
        (m) => m.memberId === this.user.id && m.status !== 2
      ) !== undefined
    ) {
      return true;
    }
    return false;
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

  openMemberProfile(memberId: number): void {
    this.router.navigate(['/my-profile/' + memberId]);
    // this.dialogRef.close();
  }

  closeDialog(): void {
    // this.dialogRef.close();
  }
}
