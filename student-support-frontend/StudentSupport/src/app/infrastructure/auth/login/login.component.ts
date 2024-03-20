import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  fieldTextType : boolean = true;

  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(username: string, password: string) {
    console.log("Korisničko ime:", username);
    console.log("Lozinka:", password);

    const login: Login = {
      username: username || "",
      password: password || "",
    };

    this.authService.login(login).subscribe({
      next: () => {
        this.router.navigate(['/userprofile/' + login.username]);
      },
    });
  }

  changeBiEye() : void{
    if(this.fieldTextType == true){
      this.fieldTextType = false;
    }else{
      this.fieldTextType = true;
    }
    
  }
  /*constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      username: this.loginForm.value.username || "",
      password: this.loginForm.value.password || "",
    };

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
    }
  }*/
}
