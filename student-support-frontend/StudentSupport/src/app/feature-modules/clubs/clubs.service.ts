import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Club } from 'src/app/shared/model/club.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private http: HttpClient) {}

  getAllClubs(user: User): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(
      environment.apiHost + user.role + '/clubs'
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
}
