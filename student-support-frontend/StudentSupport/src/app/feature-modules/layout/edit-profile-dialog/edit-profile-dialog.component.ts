import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { LayoutService } from '../layout.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from '../model/person.model';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Person,
    private service : LayoutService,
    private authSevice : AuthService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
