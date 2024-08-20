import { Component, Inject, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Report, ReportStatus, ReportType } from 'src/app/shared/model/report-model';
import { MyEvent } from '../../board/model/myevent.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrl: './report-dialog.component.css'
})
export class ReportDialogComponent implements OnInit{

  report : Report ={
    id: 0,
    eventId: 0,
    studentId: 0,
    date: new Date(),
    type: -1,
    status: 0
  }
  user!: User;
  selectedReportType: string = "";
  showError : boolean = false;

  selectedReport : string = "";

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MyEvent,
    private service : EventsService,
    private authService : AuthService,
    private toastrService : ToastrService
  ) {}
  
  ngOnInit(): void {
    this.user = this.authService.user$.value;
  }

  closeDialog(){
    this.dialogRef.close();
  }

  reportEvent(){
    this.showError = false;
    if(this.selectedReport == "")
      this.showError = true;
    else{
      this.report.eventId = this.data.id
      this.report.studentId = this.user.id
      this.report.date = new Date(),
      this.report.type =  Number(this.selectedReport)
      this.report.status = 0

      this.service.reportEvent(this.report).subscribe({
        next : ()=>{
          this.toastrService.success("Prijavili ste da događaj \"" + this.data.name +  "\" spada u neželjene događaje.", "Uspešno.")
          this.closeDialog()
        }
      })
    }
  }

}
