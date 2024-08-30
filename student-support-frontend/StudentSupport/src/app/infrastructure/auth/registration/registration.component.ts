import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'xp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  samePassword: boolean = true;
  usernameExist: boolean = false;
  errorMessage: string = ""

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    isAuthor: new FormControl(false),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  register(){
    this.markAllControlsAsTouched();

    if(this.registerForm.invalid){
      return
    }

    this.samePassword = true;
    this.usernameExist = false;
    this.errorMessage = "";
    if(this.registerForm.value.password != this.registerForm.value.repeatPassword){
      this.samePassword = false
      this.errorMessage = "Unete lozinke moraju biti iste!"
      return
    }

    const registration: Registration = {
      name: this.registerForm.value.name || '',
      surname: this.registerForm.value.surname || '',
      email: this.registerForm.value.email || '',
      username: this.registerForm.value.username || '',
      password: this.registerForm.value.password || '',
      profilePic: '',
    };


    if (this.registerForm.value.isAuthor) {
      this.authService.registerAuthor(registration).subscribe({
        next: () => {
          const registeredPerson = { email: registration.email, username: registration.username};
          this.router.navigate(['/check-email'], {
            queryParams: {
              email: registeredPerson.email,
              username: registeredPerson.username,
              role: "author" 
            }
          });
        },
        error: (err: any)=>{
          if (err.status === 400 && err.error && err.error.detail.includes("User with supplied username already exists.")) {
            this.usernameExist = true;
            this.errorMessage = "Korisničko ime je već zauzeto. Molimo vas da unesete drugo korisničko ime.";
          }
        }
      });
    } else {
      this.authService.registerStudent(registration).subscribe({
        next: () => {
          const registeredPerson = { email: registration.email, username: registration.username};
          this.router.navigate(['/check-email'], {
            queryParams: {
              email: registeredPerson.email,
              username: registeredPerson.username,
              role: "student" 
            }
          });
        },
        error: (err: any)=>{
          if (err.status === 400 && err.error && err.error.detail.includes("User with supplied username already exists.")) {
            this.usernameExist = true;
            this.errorMessage = "Korisničko ime je već zauzeto. Molimo vas da unesete drugo korisničko ime.";
          }
        }
      });
    }
  }

  private markAllControlsAsTouched(): void {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

}
