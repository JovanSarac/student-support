import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MyEvent } from '../board/model/myevent.model';
import { environment } from 'src/env/environment';
import { Participation } from 'src/app/shared/model/participation-model';
import { Person } from 'src/app/shared/model/person.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<PagedResults<MyEvent>> {
    return this.http.get<PagedResults<MyEvent>>(
      environment.apiHost + 'student/events'
    );
  }

  participateEvent(participation: Participation): Observable<Participation> {
    return this.http.post<Participation>(
      environment.apiHost + 'student/participations',
      participation
    );
  }

  cancelParticipation(participationId: number): Observable<Participation> {
    return this.http.put<Participation>(
      environment.apiHost + 'student/participations/cancel',
      participationId
    );
  }

  getAllParticipationsByStudentId(
    studentId: number
  ): Observable<Participation[]> {
    return this.http.get<Participation[]>(
      environment.apiHost + 'student/participations/by_student_id/' + studentId
    );
  }

  getYoursEvents(userId: number): Observable<MyEvent[]> {
    return this.http.get<MyEvent[]>(
      environment.apiHost + 'author/events/get_yours_events/' + userId
    );
  }

  getEventById(user: User, eventId: number): Observable<MyEvent> {
    return this.http.get<MyEvent>(
      environment.apiHost + user.role + '/events/' + eventId
    );
  }

  getPersonById(user: User, userId: number): Observable<Person> {
    return this.http.get<Person>(
      environment.apiHost + user.role + '/person/' + userId
    );
  }

  countParticipationsByEventId(
    user: User,
    eventId: number
  ): Observable<number> {
    return this.http.get<number>(
      environment.apiHost + user.role + '/participations/count/' + eventId
    );
  }

  isAuthorOfEvent(
    user: User,
    eventId: number,
    authorId: number
  ): Observable<boolean> {
    return this.http.get<boolean>(
      environment.apiHost +
        user.role +
        '/events/is_author_of_event/' +
        eventId +
        '/' +
        authorId
    );
  }

  archiveEvent(eventId: number): Observable<MyEvent> {
    return this.http.put<MyEvent>(
      environment.apiHost + 'author/events/archive',
      eventId
    );
  }
}
