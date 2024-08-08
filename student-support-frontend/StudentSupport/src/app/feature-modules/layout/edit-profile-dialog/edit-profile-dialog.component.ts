import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { LayoutService } from '../layout.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from '../model/person.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {
  person :Person={
    id: 0,
    name: '',
    surname: '',
    email: '',
    profilePic: ''
  }

  personForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthdate: new FormControl(this.person.birthDate ? new Date(this.person.birthDate) : null),
    phonenumber: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    
  });

  city: string ="";
  street: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
    private service : LayoutService,
    private authSevice : AuthService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.person = this.data;
    if(this.person.address != null){
      const parts = this.person.address.split(',');
      this.street = parts[0]; 
      this.city = parts[1]; 
    }
    this.personForm.patchValue({
      name: this.person.name,
      surname: this.person.surname,
      birthdate: this.person.birthDate ? new Date(this.person.birthDate) : null,
      phonenumber: this.person.phoneNumber,
      street: this.street,
      city: this.city
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  formatDateForInput(date: string): string {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  markdownText = 'Initial text'; // Primer inicijalnog teksta

  onSubmit(text: string | null) {
    if (text) {
      console.log('Submitted text:', text);
    } else {
      console.log('Discarded');
    }
  }

  onTextChanged(newText: string) {
    this.markdownText = newText;
    console.log('Text changed:', newText);
  }

}
