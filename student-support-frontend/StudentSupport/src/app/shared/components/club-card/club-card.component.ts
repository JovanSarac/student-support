import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Club, ClubStatus } from '../../model/club.model';
import { Router } from '@angular/router';
import { ClubsService } from 'src/app/feature-modules/clubs/clubs.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { marked } from 'marked';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from 'src/app/feature-modules/events/report-dialog/report-dialog.component';

@Component({
  selector: 'xp-club-card',
  templateUrl: './club-card.component.html',
  styleUrl: './club-card.component.css',
})
export class ClubCardComponent implements OnInit {
  @Input() isMenuVisible: boolean = false;
  @Output() menuToggle = new EventEmitter<void>();
  @Input() club: Club = {
    id: 0,
    name: '',
    description: '',
    ownerId: 0,
    memberships: [],
    eventIds: [],
    status: ClubStatus.Active,
    address: '',
    latitude: 0,
    longitude: 0,
    coverImage: '',
    datePublication: new Date(),
    announcements: [],
  };

  user!: User;

  constructor(
    public router: Router,
    private service: ClubsService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user$.value;
  }

  showSingleClub(): void {
    this.router.navigate([`/single-club/${this.club.id}`]);
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.menuToggle.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.club-card') !== null;

    if (!clickedInside && this.isMenuVisible) {
      this.menuToggle.emit();
    }
  }

  editClub(club: Club, eventClick: MouseEvent) {
    eventClick.stopPropagation();
    this.router.navigate(['/edit-club', club.id]);
  }

  closeClub(club: Club, eventClick: MouseEvent) {
    eventClick.stopPropagation();
    this.service.closeClub(club.id).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.toastrService.success(
          'Uspešno ste arhivirali događaj.',
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

  activateClub(club: Club, eventClick: MouseEvent) {
    eventClick.stopPropagation();
    this.service.reactivateClub(club.id).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.toastrService.success(
          'Uspešno ste ponovno objavili događaj.',
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

  openDialogForReport(club: Club, eventClick: MouseEvent) {
    eventClick.stopPropagation();
    let dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '600px',
      height: '600px',
      data: {
        entity: club,
        mode: 'club',
      },
    });
  }

  get convertedDescription() {
    return marked(this.club.description);
  }
}
