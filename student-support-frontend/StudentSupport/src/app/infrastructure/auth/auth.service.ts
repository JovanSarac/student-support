import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from './jwt/token.service';
import { environment } from 'src/env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './model/login.model';
import { AuthenticationResponse } from './model/authentication-response.model';
import { User } from './model/user.model';
import { Registration, RegistrationGmail } from './model/registration.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Report } from 'src/app/shared/model/report-model';
import { ClubReport } from 'src/app/shared/model/club-report.model';
import { Club } from 'src/app/shared/model/club.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>({ username: '', id: 0, role: '' });

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {}

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'users/login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
  }

  registerStudent(
    registration: Registration
  ): Observable<void> {
    return this.http
      .post<void>(
        environment.apiHost + 'users/student',
        registration
      );
  }

  registerAuthor(
    registration: Registration
  ): Observable<void> {
    return this.http.post<void>(
      environment.apiHost + 'users/author',
      registration
    );
  }

  verifyEmail(token: string): Observable<void> {
    return this.http.get<void>(`${environment.apiHost}users/verify-email`, {
      params: { token }
    });
  }

  activateUser(userId: number): Observable<User> {
    return this.http.put<User>(
      environment.apiHost + 'users/activate_user',
      userId
    );
  }

  deactivateUser(userId: number): Observable<User> {
    return this.http.put<User>(
      environment.apiHost + 'users/deactivate_user',
      userId
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiHost + 'users/get_all_users');
  }

  loginStudentGmail(
    registration: RegistrationGmail
  ): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(
        environment.apiHost + 'users/student/gmail',
        registration
      )
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
  }

  logout(): void {
    this.router.navigate(['/']).then((_) => {
      this.tokenStorage.clear();
      this.user$.next({ username: '', id: 0, role: '' });
    });
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || '';
    const user: User = {
      id: +jwtHelperService.decodeToken(accessToken).id,
      username: jwtHelperService.decodeToken(accessToken).username,
      role: jwtHelperService.decodeToken(accessToken)[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ],
    };
    this.user$.next(user);
  }

  getAllReports(): Observable<PagedResults<Report>> {
    return this.http.get<PagedResults<Report>>(
      environment.apiHost + 'administrator/reports'
    );
  }

  getReportById(reportId: number): Observable<Report> {
    return this.http.get<Report>(
      environment.apiHost + 'administrator/reports/' + reportId
    );
  }

  setReportResolved(reportId: number): Observable<Report> {
    return this.http.put<Report>(
      environment.apiHost + 'administrator/reports/resolve',
      reportId
    );
  }

  setReportDismissed(reportId: number): Observable<Report> {
    return this.http.put<Report>(
      environment.apiHost + 'administrator/reports/dismiss',
      reportId
    );
  }

  setReportClosed(reportId: number): Observable<Report> {
    return this.http.put<Report>(
      environment.apiHost + 'administrator/reports/close',
      reportId
    );
  }

  getAllClubReports(): Observable<PagedResults<ClubReport>> {
    return this.http.get<PagedResults<ClubReport>>(
      environment.apiHost + 'administrator/clubReports'
    );
  }

  getClubReportById(reportId: number): Observable<ClubReport> {
    return this.http.get<ClubReport>(
      environment.apiHost + 'administrator/clubReports/' + reportId
    );
  }

  setClubReportResolved(reportId: number): Observable<ClubReport> {
    return this.http.put<ClubReport>(
      environment.apiHost + 'administrator/clubReports/resolve',
      reportId
    );
  }

  setClubReportDismissed(reportId: number): Observable<ClubReport> {
    return this.http.put<ClubReport>(
      environment.apiHost + 'administrator/clubReports/dismiss',
      reportId
    );
  }

  setClubReportClosed(reportId: number): Observable<ClubReport> {
    return this.http.put<ClubReport>(
      environment.apiHost + 'administrator/clubReports/close',
      reportId
    );
  }

  getClubById(user: User, clubId: number): Observable<Club> {
    return this.http.get<Club>(
      environment.apiHost + user.role + '/clubs/' + clubId
    );
  }
}
