import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../../board/model/myevent.model';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import {
  Participation,
  ParticipationType,
} from 'src/app/shared/model/participation-model';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css'],
})
export class EventsPageComponent implements OnInit {
  selected!: Date;

  events: MyEvent[] = [];
  currentPage = 1;
  pageSize = 8;
  pagedEvents: MyEvent[] = [];
  participations: Participation[] = [];
  totalPages = 1;
  user!: User;
  participation: Participation = {
    id: 0,
    eventId: 0,
    studentId: 0,
    enrollmentDate: new Date(),
    type: ParticipationType.Active,
  };
  isLoading: boolean = false;
  eventIdForLoader: number = 0;

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

  constructor(
    private router: Router,
    private service: EventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.service.getAllEvents().subscribe({
      next: (result: PagedResults<MyEvent>) => {
        if (this.user.role === 'student') {
          this.events = result.results.filter((e) => !e.isArchived);
        } else {
          this.events = result.results;
        }
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePagedEvents();
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

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user.role === 'student') this.getParticipationsByStudentId();
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
      },
    });
  }

  isAlreadyCheckedParticipate(eventId: number): boolean {
    return this.participations.some(
      (p) => p.eventId === eventId && p.type === ParticipationType.Active
    );
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

  shouldShowLoader(eventId: number): boolean {
    if (this.eventIdForLoader === eventId) {
      return true;
    }
    return false;
  }

  showSingleEvent(eventId: number): void {
    this.router.navigate([`/single-event/${eventId}`]);
  }

  selectTab(tab: string) {
    this.currentPage = 1; // Reset page to 1 when tab is selected
    this.updatePagedEvents();
  }

  updatePagedEvents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEvents = this.events.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedEvents();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedEvents();
    }
  }
}
