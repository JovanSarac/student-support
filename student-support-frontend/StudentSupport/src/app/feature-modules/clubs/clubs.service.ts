import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Announcement } from 'src/app/shared/model/announcement.model';
import { ClubReport } from 'src/app/shared/model/club-report.model';
import { Club } from 'src/app/shared/model/club.model';
import { Membership } from 'src/app/shared/model/membership.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Person } from 'src/app/shared/model/person.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private http: HttpClient) {}

  // **************************************CLUBS SECTION**********************************************
  getAllClubs(user: User): Observable<PagedResults<Club>> {
    if (user.role === 'student' || user.role === 'author') {
      return this.http.get<PagedResults<Club>>(
        environment.apiHost + user.role + '/clubs/active_clubs'
      );
    } else {
      return this.http.get<PagedResults<Club>>(
        environment.apiHost + user.role + '/clubs'
      );
    }
  }

  getClubsByAuthorId(authorId: number): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(
      environment.apiHost + 'author/clubs/created_clubs/' + authorId
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

  reportClub(report: ClubReport): Observable<ClubReport> {
    return this.http.post<ClubReport>(
      environment.apiHost + 'student/clubReports',
      report
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

  suspendMembership(user: User, membershipId: number): Observable<Membership> {
    return this.http.put<Membership>(
      environment.apiHost + user.role + '/memberships/suspend',
      membershipId
    );
  }

  makeAMember(user: User, membershipId: number): Observable<Membership> {
    return this.http.put<Membership>(
      environment.apiHost + user.role + '/memberships/make_a_member',
      membershipId
    );
  }

  promoteToClubAdmin(membershipId: number): Observable<Membership> {
    return this.http.put<Membership>(
      environment.apiHost + 'author/memberships/promote_to_club_admin',
      membershipId
    );
  }

  // **************************************MEMBERS SECTION**********************************************
  getMembersByClubId(
    user: User,
    clubId: number
  ): Observable<PagedResults<Person>> {
    return this.http.get<PagedResults<Person>>(
      environment.apiHost + user.role + '/person/club_members/' + clubId
    );
  }

  // **************************************ANNOUNCEMENT SECTION**********************************************
  createAnnouncement(
    user: User,
    announcement: Announcement
  ): Observable<Announcement> {
    return this.http.post<Announcement>(
      environment.apiHost + user.role + '/announcements',
      announcement
    );
  }

  updateAnnouncement(
    user: User,
    announcement: Announcement
  ): Observable<Announcement> {
    return this.http.put<Announcement>(
      environment.apiHost + user.role + '/announcements',
      announcement
    );
  }

  deleteAnnouncement(user: User, announcementId: number): Observable<void> {
    return this.http.delete<void>(
      environment.apiHost + user.role + '/announcements/' + announcementId
    );
  }

  getAnnouncementById(
    user: User,
    announcementId: number
  ): Observable<Announcement> {
    return this.http.get<Announcement>(
      environment.apiHost + user.role + '/announcements/' + announcementId
    );
  }
}
