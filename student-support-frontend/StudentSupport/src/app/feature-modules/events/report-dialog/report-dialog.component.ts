import { Component, Inject, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import {
  Report,
  ReportStatus,
  ReportType,
} from 'src/app/shared/model/report-model';
import { MyEvent } from '../../board/model/myevent.model';
import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/shared/model/club.model';
import { ClubReport } from 'src/app/shared/model/club-report.model';
import { ClubsService } from '../../clubs/clubs.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.css',
})
export class ReportDialogComponent implements OnInit {
  report: Report = {
    id: 0,
    eventId: 0,
    studentId: 0,
    date: new Date(),
    type: -1,
    status: 0,
  };

  clubReport: ClubReport = {
    id: 0,
    clubId: 0,
    studentId: 0,
    date: new Date(),
    type: -1,
    status: 0,
  };
  user!: User;
  selectedReportType: string = '';
  showError: boolean = false;

  selectedReport: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { entity: MyEvent | Club; mode: string },
    private service: EventsService,
    private clubService: ClubsService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user$.value;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  reportClub(): void {
    this.showError = false;
    if (this.selectedReport == '') this.showError = true;
    else {
      this.clubReport.clubId = this.data.entity.id;
      this.clubReport.studentId = this.user.id;
      (this.clubReport.date = new Date()),
        (this.clubReport.type = Number(this.selectedReport));
      this.clubReport.status = 0;

      this.clubService.reportClub(this.clubReport).subscribe({
        next: () => {
          this.toastrService.success(
            'Prijavili ste da klub "' +
              this.data.entity.name +
              '" spada u neželjene događaje.',
            'Uspešno.'
          );
          this.closeDialog();
        },
      });
    }
  }

  reportEvent() {
    this.showError = false;
    if (this.selectedReport == '') this.showError = true;
    else {
      this.report.eventId = this.data.entity.id;
      this.report.studentId = this.user.id;
      (this.report.date = new Date()),
        (this.report.type = Number(this.selectedReport));
      this.report.status = 0;

      this.service.reportEvent(this.report).subscribe({
        next: () => {
          this.toastrService.success(
            'Prijavili ste da događaj "' +
              this.data.entity.name +
              '" spada u neželjene događaje.',
            'Uspešno.'
          );
          this.closeDialog();
        },
      });
    }
  }
}
