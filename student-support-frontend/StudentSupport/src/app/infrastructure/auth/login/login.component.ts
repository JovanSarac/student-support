declare var google: any;
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { Registration, RegistrationGmail } from '../model/registration.model';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  wrongCredential: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    window.scrollTo(0, 0);
    google.accounts.id.initialize({
      client_id:
        '924748235972-j6taod5re397o64elbh7f0kf4in7lsqh.apps.googleusercontent.com',
      callback: (response: any) => this.handleLogin(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn-container'),
      {
        theme: 'outline',
        shape: 'rectangle',
        size: 'large',
      }
    );
  }

  login() {
    this.wrongCredential = false;
    this.markAllControlsAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    const login: Login = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    this.authService.login(login).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.wrongCredential = true;
      },
    });

  }

  private markAllControlsAsTouched(): void {
    Object.values(this.loginForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }


  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  /*convertUrlToBase64(url: string): Promise<string> {
    return fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  }*/

  // U tvom kodu, nakon što dobiješ `profilePic` iz `payLoad`
  handleLogin(response: any) {
    if (response) {
      const payLoad = this.decodeToken(response.credential);

      if (payLoad.email_verified) {
        const registration: RegistrationGmail = {
          name: payLoad.given_name || '',
          surname: payLoad.family_name || '',
          email: payLoad.email || '',
          profilePic: /*payLoad.picture ||*/ '',
        };

        this.authService.loginStudentGmail(registration).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
        });

        // Pretvori URL u Base64
        /*this.convertUrlToBase64(registration.profilePic).then(base64Image => {
          const base64Data = base64Image.split(',')[1];
          registration.profilePic = base64Data;
  
          // Ako treba, možeš dodatno obraditi sliku ili je proslediti na server
          this.authService.loginStudentGmail(registration).subscribe({
            next: () => {
              this.router.navigate(['/']);
            },
          });
        }).catch(error => {
          console.error('Error converting URL to Base64:', error);
        });*/
      }
    }
  }

  registerClick(): void {
    this.router.navigate(['/register']);
  }
}
