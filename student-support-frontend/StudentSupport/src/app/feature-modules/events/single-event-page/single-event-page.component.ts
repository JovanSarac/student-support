import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyEvent } from '../../board/model/myevent.model';
import { EventsService } from '../events.service';
import { Person } from 'src/app/shared/model/person.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import {
  Participation,
  ParticipationType,
} from 'src/app/shared/model/participation-model';
import { marked, options } from 'marked';
import { ToastrService } from 'ngx-toastr';
import { ClubsService } from '../../clubs/clubs.service';
import { Club, ClubStatus } from 'src/app/shared/model/club.model';

declare var jQuery: any;

@Component({
  selector: 'app-single-event-page',
  templateUrl: './single-event-page.component.html',
  styleUrls: ['./single-event-page.component.css'],
})
export class SingleEventPageComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  eventId: number = 0;
  participationNumber: number = 0;
  isLoading: boolean = false;
  eventIdForLoader: number = 0;
  user!: User;
  participations: Participation[] = [];
  isAuthor: boolean = false;
  isCollapsed: boolean = false;
  participation: Participation = {
    id: 0,
    eventId: 0,
    studentId: 0,
    enrollmentDate: new Date(),
    type: ParticipationType.Active,
  };

  event: MyEvent = {
    id: 0,
    name: '',
    userId: 0,
    description: '',
    dateEvent: new Date(),
    dateEndEvent: new Date(),
    datePublication: new Date(),
    address: '',
    images: [],
    eventType: '',
    latitude: 0,
    longitude: 0,
    isArchived: false,
  };

  author: Person = {
    id: 0,
    name: '',
    surname: '',
    userId: 0,
    email: '',
    profilePic: '',
  };

  club: Club = {
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
    datePublication: new Date(),
    coverImage: ''
  }

  constructor(
    private route: ActivatedRoute,
    private service: EventsService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private clubService : ClubsService
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.getLoggedUser();
    this.getEventById();
    // ($('#carouselExampleIndicators') as any).carousel();
  }

  getEventById(): void {
    this.service.getEventById(this.user, this.eventId).subscribe({
      next: (result: MyEvent) => {
        this.event = result;
        this.getAuthor();
        if(this.event.clubId != null){
          this.getClubById(this.event.clubId)
        }
        this.countParticipationsByEventId();
        this.checkIfUserIsAuthorOfEvent();
        (jQuery('#carouselExampleIndicators') as any).carousel();
      },
    });
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user.role === 'student') this.getParticipationsByStudentId();
    });
  }

  getAuthor(): void {
    this.service.getPersonById(this.user, this.event.userId).subscribe({
      next: (result: Person) => {
        this.author = result;
      },
    });
  }

  getParticipationsByStudentId(): void {
    this.service.getAllParticipationsByStudentId(this.user.id).subscribe({
      next: (result: Participation[]) => {
        this.participations = result;
      },
    });
  }

  countParticipationsByEventId(): void {
    this.service
      .countParticipationsByEventId(this.user, this.event.id)
      .subscribe({
        next: (result: number) => {
          this.participationNumber = result;
        },
      });
  }

  participateEvent(eventId: number): void {
    this.isLoading = true;
    this.eventIdForLoader = eventId;
    this.participation.eventId = eventId;
    this.participation.studentId = this.user.id;
    this.service.participateEvent(this.participation).subscribe({
      next: (result: Participation) => {
        this.isLoading = false;
        this.eventIdForLoader = 0;
        this.getParticipationsByStudentId();
        this.countParticipationsByEventId();
        this.toastrService.success(
          'Uspešno ste se odazvali za događaj: ' +
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

  cancelEventParticipation(eventId: number): void {
    const cancelledParticipation = this.participations.find(
      (p) =>
        p.studentId === this.user.id &&
        p.eventId === eventId &&
        p.type === ParticipationType.Active
    );

    this.service.cancelParticipation(cancelledParticipation?.id!).subscribe({
      next: (result: Participation) => {
        this.countParticipationsByEventId();
        this.getParticipationsByStudentId();
        this.toastrService.success(
          'Uspešno ste se odjavili sa događaja: ' + this.event.name + '!',
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

  archiveEvent() {
    this.service.archiveEvent(this.event.id).subscribe({
      next: (result: MyEvent) => {
        this.event = result;
        this.countParticipationsByEventId();
        this.toastrService.success(
          'Uspešno ste arhivirali događaj.',
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

  publishEvent() {
    this.service.publishEvent(this.event.id).subscribe({
      next: (result: MyEvent) => {
        this.event = result;
        this.toastrService.success(
          'Uspešno ste ponovno objavili događaj.',
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

  resendEmail(): void {
    this.service.resendEmail(this.event.id, this.user.id).subscribe({
      next: () => {
        this.toastrService.success(
          'Uspešno ste zatražili ponovno slanje e-maila.',
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

  checkIfUserIsAuthorOfEvent(): void {
    if (this.user.role === 'author') {
      this.service
        .isAuthorOfEvent(this.user, this.event.id, this.user.id)
        .subscribe({
          next: (result: boolean) => {
            this.isAuthor = result;
          },
        });
    }
  }

  isAlreadyCheckedParticipate(eventId: number): boolean {
    return this.participations.some(
      (p) => p.eventId === eventId && p.type === ParticipationType.Active
    );
  }

  isEventInFuture(dateEvent: string): boolean {
    return new Date(dateEvent) > new Date();
  }

  shouldShowLoader(eventId: number): boolean {
    if (this.eventIdForLoader === eventId) {
      return true;
    }
    return false;
  }

  setMarkerOnMap(): void {
    if (this.mapComponent) {
      this.mapComponent.addMarker(this.event.latitude, this.event.longitude);
      this.mapComponent.setView(this.event.latitude, this.event.longitude, 15);
    } else {
      console.log(this.mapComponent);
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.cdr.detectChanges();
    this.setMarkerOnMap();
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
    return marked(this.event.description);
  }

  openEditEventPage(): void {
    if(this.event.clubId == null){
      this.router.navigate(['/edit-event', this.eventId]);
    }else{
      this.router.navigate(['/edit-event-byclub', this.eventId]);
    }
  }

  openProfile(): void {
    this.router.navigate(['/my-profile/' + this.author.id]);
  }

  getClubById(clubId : number){
    this.clubService.getClubById(this.user, clubId).subscribe({
      next: (result : Club)=>{
        this.club = result;
      }
    })
  }

  openClub(): void {
    this.router.navigate(['/single-club/' + this.club.id]);
  }
}
