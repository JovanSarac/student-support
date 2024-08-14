import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Report } from 'src/app/shared/model/report-model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/feature-modules/events/events.service';
import { MyEvent } from 'src/app/feature-modules/board/model/myevent.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
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
    this.getLoggedUser();
  }

  loadReports(): void {
    this.service.getAllReports().subscribe({
      next: (result: PagedResults<Report>) => {
        this.reports = result.results;
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
          'Uspešno ste označili prijavu kao rešenu.',
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

  openSelectedEvent(eventId: number): void {
    this.router.navigate(['/single-event/' + eventId]);
  }

  openStudentProfile(studentId: number): void {
    this.router.navigate(['/my-profile/' + studentId]);
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
