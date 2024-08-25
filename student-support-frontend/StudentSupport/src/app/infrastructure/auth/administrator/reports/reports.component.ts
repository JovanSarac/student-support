import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/shared/model/report-model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/feature-modules/events/events.service';
import { MyEvent } from 'src/app/feature-modules/board/model/myevent.model';
import { User } from '../../model/user.model';
import { ClubReport } from 'src/app/shared/model/club-report.model';
import { Club } from 'src/app/shared/model/club.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  clubReports: ClubReport[] = [];
  user!: User;

  constructor(
    private service: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private eventsService: EventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReports();
    this.loadClubReports();
    this.getLoggedUser();
  }

  loadReports(): void {
    this.service.getAllReports().subscribe({
      next: (result: PagedResults<Report>) => {
        this.reports = result.results.sort((a, b) => a.status - b.status);
      },
    });
  }

  loadClubReports(): void {
    this.service.getAllClubReports().subscribe({
      next: (result: PagedResults<ClubReport>) => {
        this.clubReports = result.results.sort((a, b) => a.status - b.status);
      },
    });
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  setReportResolved(reportId: number): void {
    this.service.setReportResolved(reportId).subscribe({
      next: (result: Report) => {
        this.loadReports();
        this.toastrService.success(
          'Uspešno ste označili prijavu kao rešenu i otkazali ovaj događaj.',
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

  setClubReportResolved(reportId: number): void {
    this.service.setClubReportResolved(reportId).subscribe({
      next: (result: ClubReport) => {
        this.loadClubReports();
        this.toastrService.success(
          'Uspešno ste označili prijavu kao rešenu i otkazali ovaj događaj.',
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

  setReportDismissed(reportId: number): void {
    this.service.setReportDismissed(reportId).subscribe({
      next: (result: Report) => {
        this.loadReports();
        this.toastrService.success(
          'Uspešno ste označili prijavu kao odbijenu.',
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

  setClubReportDismissed(reportId: number): void {
    this.service.setClubReportDismissed(reportId).subscribe({
      next: (result: ClubReport) => {
        this.loadClubReports();
        this.toastrService.success(
          'Uspešno ste označili prijavu kao odbijenu.',
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

  setReportClosed(reportId: number): void {
    this.service.setReportClosed(reportId).subscribe({
      next: (result: Report) => {
        this.loadReports();
        this.toastrService.success(
          'Uspešno ste označili prijavu kao zatvorenu.',
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

  setClubReportClosed(reportId: number): void {
    this.service.setClubReportClosed(reportId).subscribe({
      next: (result: ClubReport) => {
        this.loadClubReports();
        this.toastrService.success(
          'Uspešno ste označili prijavu kao zatvorenu.',
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

  openSelectedEvent(eventId: number): void {
    this.router.navigate(['/single-event/' + eventId]);
  }

  openSelectedClub(clubId: number): void {
    this.router.navigate(['/single-club/' + clubId]);
  }

  openStudentProfile(studentId: number): void {
    this.router.navigate(['/my-profile/' + studentId]);
  }

  openOwnersProfile(clubId: number): void {
    this.service.getClubById(this.user, clubId).subscribe({
      next: (result: Club) => {
        this.router.navigate(['/my-profile/' + result.ownerId]);
      },
    });
  }

  openAuthorProfile(eventId: number): void {
    this.eventsService.getEventById(this.user, eventId).subscribe({
      next: (result: MyEvent) => {
        this.router.navigate(['/my-profile/' + result.userId]);
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
