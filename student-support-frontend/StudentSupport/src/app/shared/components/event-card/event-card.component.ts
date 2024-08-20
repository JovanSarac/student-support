import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MyEvent } from 'src/app/feature-modules/board/model/myevent.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import {
  Participation,
  ParticipationType,
} from '../../model/participation-model';
import { EventsService } from 'src/app/feature-modules/events/events.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ReportDialogComponent } from 'src/app/feature-modules/events/report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'xp-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() event: MyEvent = {
    id: 10,
    address: '',
    dateEvent: new Date(),
    dateEndEvent: new Date(),
    datePublication: new Date(),
    description: '',
    eventType: '',
    images: [],
    isArchived: false,
    latitude: 0,
    longitude: 0,
    name: '',
    userId: 0,
  };
  @Output() OnClick = new EventEmitter();
  @Input() isMenuVisible: boolean = false; // Input za vidljivost menija
  @Output() menuToggle = new EventEmitter<void>(); // Output za obaveštavanje roditeljske komponente o promenama menija


  user!: User;
  participation: Participation = {
    id: 0,
    eventId: 0,
    studentId: 0,
    enrollmentDate: new Date(),
    type: ParticipationType.Active,
  };
  participations: Participation[] = [];
  isLoading: boolean = false;
  eventIdForLoader: number = 0;
  menuVisible: boolean = false;

  constructor(
    public router: Router,
    private service: EventsService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
    //this.getParticipationsByStudentId();
  }

  emitEvent(): void {
    this.OnClick.emit();
  }

  showSingleEvent(): void {
    this.router.navigate([`/single-event/${this.event.id}`]);
  }

  getParticipationsByStudentId(): void {
    this.service.getAllParticipationsByStudentId(this.user.id).subscribe({
      next: (result: Participation[]) => {
        this.participations = result;
      },
    });
  }

  participateEvent(event: Event, eventId: number): void {
    event.stopPropagation();
    this.isLoading = true;
    this.eventIdForLoader = eventId;
    this.participation.eventId = eventId;
    this.participation.studentId = this.user.id;
    this.service.participateEvent(this.participation).subscribe({
      next: (result: Participation) => {
        this.getParticipationsByStudentId();
        this.isLoading = false;
        this.eventIdForLoader = 0;
        this.toastrService.success(
          'Uspešno ste se odazvali za događaj :' +
            this.event.name +
            '! <br>Kroz par trenutaka dobićete imejl i mogućnost dodavanja ovog događaja u Vaš Google Calendar.',
          'Uspešno',
          {
            timeOut: 10000, // Trajanje u milisekundama, ovde 10 sekundi
            extendedTimeOut: 2000, // Vreme produžetka ako korisnik pređe mišem preko toast-a
            closeButton: true,
            progressBar: true,
            enableHtml: true,
          }
        );
      },
    });
  }

  cancelEventParticipation(event: Event, eventId: number): void {
    event.stopPropagation();
    const cancelledParticipation = this.participations.find(
      (p) =>
        p.studentId === this.user.id &&
        p.eventId === eventId &&
        p.type === ParticipationType.Active
    );

    this.service.cancelParticipation(cancelledParticipation?.id!).subscribe({
      next: (result: Participation) => {
        this.getParticipationsByStudentId();
        this.toastrService.success(
          'Uspešno ste se odjavili sa događaja :' + this.event.name + '!',
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

  shouldShowLoader(eventId: number): boolean {
    if (this.eventIdForLoader === eventId) {
      return true;
    }
    return false;
  }

  isAlreadyCheckedParticipate(eventId: number): boolean {
    return this.participations.some(
      (p) => p.eventId === eventId && p.type === ParticipationType.Active
    );
  }

  isEventInFuture(dateEvent: string): boolean {
    return new Date(dateEvent) > new Date();
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user.role === 'student') this.getParticipationsByStudentId();
    });
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

  eventType: { [key: string]: string } = {
    AcademicConferenceAndSeminars: 'Konferencija',
    WorkshopsAndCourses: 'Kurs',
    CulturalEvent: 'Kultura',
    Fair: 'Sajam',
    HumanitarianEvent: 'Humanitarnost',
    ArtExhibitionsAndPerformances: 'Umetnost',
    StudentPartiesAndSocialEvents: 'Društvenost',
    Competitions: 'Takmičenje',
    StudentTrips: 'Putovanje',
    Other: 'Ostalo',
  };

  eventTypeColors: { [key: string]: string } = {
    AcademicConferenceAndSeminars: '#6A0DAD',
    WorkshopsAndCourses: '#FFD700',
    CulturalEvent: '#FF4500',
    Fair: '#8B4513',
    HumanitarianEvent: '#FF6347',
    ArtExhibitionsAndPerformances: '#4682B4',
    StudentPartiesAndSocialEvents: '#FF69B4',
    Competitions: '#32CD32',
    StudentTrips: '#FF8C00',
    Other: '#DA70D6',
  };

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.menuToggle.emit(); 
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.event-card') !== null;

    if (!clickedInside && this.isMenuVisible) {
      this.menuToggle.emit();
    }
  }

  editEvent(event: MyEvent, eventClick: MouseEvent){
    eventClick.stopPropagation();
    this.router.navigate(['/edit-event', event.id]);
  }

  archiveEvent(event: MyEvent, eventClick: MouseEvent){
    eventClick.stopPropagation();
    this.service.archiveEvent(event.id).subscribe({
      next: (result: MyEvent) => {
        this.event = result;
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

  publishEvent(event: MyEvent, eventClick: MouseEvent) {
    eventClick.stopPropagation();
    this.service.publishEvent(event.id).subscribe({
      next: (result: MyEvent) => {
        this.event = result;
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

  openDialogForReport(event : MyEvent, eventClick: MouseEvent){
    eventClick.stopPropagation();
    let dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '600px',
      height: '600px',
      data: event,
    });
  }


}
