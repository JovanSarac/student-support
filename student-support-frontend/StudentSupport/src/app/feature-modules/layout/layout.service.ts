import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/env/environment';
import { Person } from './model/person.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ContactMessage } from './model/contact-message.model';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private personSubject: BehaviorSubject<Person | null> =
    new BehaviorSubject<Person | null>(null);
  public person$: Observable<Person | null> = this.personSubject.asObservable();

  constructor(private http: HttpClient) {}

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

  getUserById(user: User, userId: number): Observable<User> {
    return this.http.get<User>(
      environment.apiHost + user.role + '/users/' + userId
    );
  }

  updatePerson(user: User, person: Person): Observable<Person> {
    return this.http
      .put<Person>(
        environment.apiHost + user.role + '/person/' + person.id,
        person
      )
      .pipe(
        tap((updatedPerson: Person) => {
          this.personSubject.next(updatedPerson);
        })
      );
  }

  loadPerson(user: User): void {
    this.getPersonByUser(user).subscribe({
      next: (person: Person) => {
        this.personSubject.next(person);
      },
    });
  }

  sendContactMessage(message : ContactMessage):Observable<ContactMessage>{
    return this.http
      .post<ContactMessage>(
        environment.apiHost + 'anonymus/contactus' ,
        message
      )
  }
}
