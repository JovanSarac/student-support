import { Component } from '@angular/core';
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
export class RegistrationComponent {
  fieldTextType: boolean = true;
  validName: boolean = false;
  validSurname: boolean = false;
  validEmail: boolean = false;
  validUsername: boolean = false;
  validPassword: boolean = false;
  samePassword: boolean = false;
  isAuthor: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  changeBiEye(): void {
    if (this.fieldTextType == true) {
      this.fieldTextType = false;
    } else {
      this.fieldTextType = true;
    }
  }

  register(
    name: string,
    surname: string,
    email: string,
    username: string,
    password: string,
    passwordagain: string
  ): void {
    const registration: Registration = {
      name: name || '',
      surname: surname || '',
      email: email || '',
      username: username || '',
      password: password || '',
      profilePic: '',
    };

    if (this.validate(registration, passwordagain)) {
      if (password === passwordagain) {
        if (this.isAuthor) {
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
              this.router.navigate(['/']);
            },
          });
        }
      }
    }
  }

  validate(registration: Registration, passwordagain: string): boolean {
    this.validName = false;
    this.validSurname = false;
    this.validUsername = false;
    this.validEmail = false;
    this.validPassword = false;
    this.samePassword = false;
    if (registration.name == '') {
      this.validName = true;
    }
    if (registration.surname == '') {
      this.validSurname = true;
    }
    if (registration.email == '') {
      this.validEmail = true;
    }
    if (registration.username == '') {
      this.validUsername = true;
    }
    if (registration.password != passwordagain) {
      this.samePassword = true;
    } else if (registration.password == '' || passwordagain == '') {
      this.validPassword = true;
    }
    if (
      registration.name != '' &&
      registration.surname != '' &&
      registration.email != '' &&
      registration.username != '' &&
      registration.password != ''
    ) {
      return true;
    }
    return false;
  }
}
