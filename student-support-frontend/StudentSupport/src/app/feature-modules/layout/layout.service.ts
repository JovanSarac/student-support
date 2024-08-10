import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MyEvent } from '../board/model/myevent.model';
import { environment } from 'src/env/environment';
import { Person } from './model/person.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private http: HttpClient) {}

  getAllEvenets(): Observable<PagedResults<MyEvent>> {
    return this.http.get<PagedResults<MyEvent>>(
      environment.apiHost + 'student/events'
    );
  }

  getPersonByUser(user: User): Observable<Person> {
    return this.http.get<Person>(
      environment.apiHost + user.role + '/person/' + user.id
    );
  }

  getPersonById(user: User, userId: number): Observable<Person> {
    return this.http.get<Person>(
      environment.apiHost + user.role + '/person/' + userId
    );
  }

  updatePerson(user: User, person: Person): Observable<Person> {
    return this.http.put<Person>(
      environment.apiHost + user.role + '/person/' + person.id,
      person
    );
  }

  getUserById(user: User, userId: number): Observable<User> {
    return this.http.get<User>(
      environment.apiHost + user.role + '/users/' + userId
    );
  }
}
