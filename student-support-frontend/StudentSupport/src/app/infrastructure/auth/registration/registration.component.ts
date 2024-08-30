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
    if(this.registerForm.value.password != this.registerForm.value.repeatPassword){
      this.samePassword = false
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
          this.toastrService.success(
            'Zahtev za registraciju je poslat, uskoro će ga administrator obraditi i bićete obavešteni mejlom.',
            'Uspešno',
            {
              timeOut: 4000,
              extendedTimeOut: 2000,
              closeButton: true,
              progressBar: true,
            }
          );
          this.router.navigate(['/']);
        },
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
      });
    }
  }

  private markAllControlsAsTouched(): void {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

}
