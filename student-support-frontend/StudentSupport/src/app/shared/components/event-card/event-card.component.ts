import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'xp-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() event: MyEvent = {
    id: 10,
    address: 'Novi Sad, Lasla Gala 28a',
    dateEvent: new Date(),
    datePublication: new Date(),
    description: '',
    eventType: 'ArtExhibitionsAndPerformances',
    image:
      'https://c4.wallpaperflare.com/wallpaper/556/382/458/fantasy-art-artwork-fan-art-science-fiction-wallpaper-preview.jpg',
    isArchived: false,
    latitude: 0,
    longitude: 0,
    name: 'Art&Science Event - Spojimo nauku i umetnost kako to najbolje umemo',
    userId: 0,
  };
  @Output() OnClick = new EventEmitter();
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

  constructor(
    public router: Router,
    private service: EventsService,
    private authService: AuthService,
    private toastrService: ToastrService
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
          "Uspešno ste se odazvali za događaj :" + this.event.name + "! <br>Kroz par trenutaka dobićete imejl i mogućnost dodavanja ovog događaja u Vaš Google Calendar.", 
          "Uspešno",
          {
            timeOut: 10000, // Trajanje u milisekundama, ovde 10 sekundi
            extendedTimeOut: 2000, // Vreme produžetka ako korisnik pređe mišem preko toast-a
            closeButton: true, 
            progressBar: true,
            enableHtml: true 
          });
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
          "Uspešno ste se odjavili sa događaja :" + this.event.name + "!", 
          "Uspešno",
          {
            timeOut: 4000, // Trajanje u milisekundama, ovde 10 sekundi
            extendedTimeOut: 2000, // Vreme produžetka ako korisnik pređe mišem preko toast-a
            closeButton: true, 
            progressBar: true,
          });
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
    AcademicConferenceAndSeminars: 'Konferencije',
    WorkshopsAndCourses: 'Kursevi',
    CulturalEvent: 'Kulturni',
    Fair: 'Sajamski',
    HumanitarianEvent: 'Humanitarni',
    ArtExhibitionsAndPerformances: 'Umjetnicki',
    StudentPartiesAndSocialEvents: 'Drustveni',
    Competitions: 'Takmicenja',
    StudentTrips: 'Putovanja',
  };

  eventTypeColors: { [key: string]: string } = {
    AcademicConferenceAndSeminars: '#429D66',
    WorkshopsAndCourses: ' #FF4D4D',
    CulturalEvent: '#00BFFF',
    Fair: '#FF9501',
    HumanitarianEvent: '#FFD700',
    ArtExhibitionsAndPerformances: '#DF80FF',
    StudentPartiesAndSocialEvents: '#66CDAA',
    Competitions: '#FFA07A',
    StudentTrips: 'rgb(61,61,254)',
  };
}
