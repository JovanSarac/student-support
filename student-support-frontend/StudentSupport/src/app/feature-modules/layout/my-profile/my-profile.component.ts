import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../model/person.model';
import { LayoutService } from '../layout.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [DatePipe]
})
export class MyProfileComponent  implements OnInit{

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
  name: string ="";
  lastname: string = "";
  email: string = "";
  phonenumber : string = "";
  biography: string = "";

  constructor(private authService:AuthService, private service: LayoutService, private datePipe: DatePipe){

  }


  ngOnInit(): void {
    this.user = this.authService.user$.value;
    this.service.getPersonByUser(this.user).subscribe({
      next:(result: Person)=>{
        this.person = result;
        console.log(this.person)
        this.name = this.person.name;
        this.lastname = this.person.surname;
        this.email = this.person.email;
        this.phonenumber = this.person.phoneNumber || "";
        this.biography = this.person.biography || "";
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

  focusPhoneInput(): void {
    document.getElementById("phonenumber")?.focus();
  }

  focusNameInput(): void {
    document.getElementById("name")?.focus();
  }

  focusLastnameInput(): void {
    document.getElementById("lastname")?.focus();
  }

  focusBiographyInput() :void{
    document.getElementById("biography")?.focus();
  }


}
