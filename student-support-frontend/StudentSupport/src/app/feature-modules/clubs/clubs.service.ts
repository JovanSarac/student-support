import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Club } from 'src/app/shared/model/club.model';
import { Membership } from 'src/app/shared/model/membership.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private http: HttpClient) {}

  // **************************************CLUBS SECTION**********************************************
  getAllClubs(user: User): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(
      environment.apiHost + user.role + '/clubs'
    );
  }

  getAllJoinedClubs(user: User): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(
      environment.apiHost + 'student/clubs/joined_clubs/' + user.id
    );
  }

  getClubById(user: User, clubId: number): Observable<Club> {
    return this.http.get<Club>(
      environment.apiHost + user.role + '/clubs/' + clubId
    );
  }

  createClub(club: Club): Observable<Club> {
    return this.http.post<Club>(environment.apiHost + 'author/clubs', club);
  }

  updateClub(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'author/clubs', club);
  }

  closeClub(clubId: number): Observable<Club> {
    return this.http.put<Club>(
      environment.apiHost + 'author/clubs/close',
      clubId
    );
  }

  closeClubByAdmin(clubId: number): Observable<Club> {
    return this.http.put<Club>(
      environment.apiHost + 'administrator/clubs/close_by_admin',
      clubId
    );
  }

  reactivateClub(clubId: number): Observable<Club> {
    return this.http.put<Club>(
      environment.apiHost + 'author/clubs/activate',
      clubId
    );
  }

  isAuthorOfClub(
    user: User,
    clubId: number,
    authorId: number
  ): Observable<boolean> {
    return this.http.get<boolean>(
      environment.apiHost +
        user.role +
        '/clubs/is_author_of_club/' +
        clubId +
        '/' +
        authorId
    );
  }
  // **************************************MEMBERSHIP SECTION**********************************************
  getAllMemberships(user: User): Observable<PagedResults<Membership>> {
    return this.http.get<PagedResults<Membership>>(
      environment.apiHost + user.role + '/memberships'
    );
  }

  createMembership(membership: Membership): Observable<Membership> {
    return this.http.post<Membership>(
      environment.apiHost + 'student/memberships',
      membership
    );
  }

  leaveClub(membershipId: number): Observable<Membership> {
    return this.http.put<Membership>(
      environment.apiHost + 'student/memberships/leave',
      membershipId
    );
  }
}
