import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    datePublication: new Date(),
    address: '',
    image: '',
    eventType: '',
    latitude: 0,
    longitude: 0,
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
    private service: EventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.getLoggedUser();
    this.getEventById();
  }

  setMarkerOnMap(): void {
    if (this.mapComponent) {
      this.mapComponent.addMarker(this.event.latitude, this.event.longitude);
      this.mapComponent.setView(this.event.latitude, this.event.longitude, 15);
    }
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user.role === 'student') this.getParticipationsByStudentId();
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

  isAlreadyCheckedParticipate(eventId: number): boolean {
    return this.participations.some(
      (p) => p.eventId === eventId && p.type === ParticipationType.Active
    );
  }

  shouldShowLoader(eventId: number): boolean {
    if (this.eventIdForLoader === eventId) {
      return true;
    }
    return false;
  }

  getEventById(): void {
    this.service.getEventById(this.user, this.eventId).subscribe({
      next: (result: MyEvent) => {
        this.event = result;
        this.getAuthor();
        this.countParticipationsByEventId();
        this.setMarkerOnMap();
      },
    });
  }

  getAuthor(): void {
    this.service.getPersonById(this.user, this.event.userId).subscribe({
      next: (result: Person) => {
        this.author = result;
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
}
