import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../model/person.model';
import { LayoutService } from '../layout.service';
import { DatePipe } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [DatePipe]
})
export class MyProfileComponent  implements OnInit{
  @ViewChild('biographyTextarea') biographyTextarea!: ElementRef;

  user!: User;
  person :Person={
    id: 0,
    name: '',
    surname: '',
    email: '',
    profilePic: ''
  }
  selectedProfilePic : string = ""
  defaultProfilePic :string = "../../assets/images/profile-pic.jpg"
  city: string ="";
  street: string = "";

  constructor(
    private authService:AuthService, 
    private service: LayoutService, 
    private datePipe: DatePipe,
    private dialog: MatDialog
  ){}


  ngOnInit(): void {
    this.user = this.authService.user$.value;
    this.service.getPersonByUser(this.user).subscribe({
      next:(result: Person)=>{
        this.person = result;
        
        if(this.person.address != null){
          const parts = this.person.address.split(',');
          this.street = parts[0]; 
          this.city = parts[1]; 
        }

      } 
    });

  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedProfilePic = URL.createObjectURL(file);
    this.person.profilePic = this.selectedProfilePic;
    this.service.updatePerson(this.user, this.person).subscribe({
      next: (result:Person)=>{
        console.log(result)
      }
    })
  }

  getFormattedDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  openEditDialog(person: Person){
    let dialogRef = this.dialog.open(EditProfileDialogComponent, { 
      width: '900px',
      height: '700px', 
      data: this.person 
    }); 
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.click();
  }

  addHover() {
    const label = document.querySelector('.profile-pic .-label');
    if (label) {
      label.classList.add('hover');
    }
  }
  
  removeHover() {
    const label = document.querySelector('.profile-pic .-label');
    if (label) {
      label.classList.remove('hover');
    }
  }

}
