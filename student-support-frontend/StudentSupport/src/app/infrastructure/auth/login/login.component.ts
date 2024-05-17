declare var google : any;
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { Registration } from '../model/registration.model';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  fieldTextType : boolean = true;
  validUsername: boolean = false;
  validPassword: boolean = false;
  wrongCredential: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '924748235972-j6taod5re397o64elbh7f0kf4in7lsqh.apps.googleusercontent.com',
      callback: (response: any)=>this.handleLogin(response)
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme: 'filled_blue',

      shape: 'rectangle',
      width: 200
    })
  }

  login(username: string, password: string) {
    const login: Login = {
      username: username || "",
      password: password || "",
    };

    if(this.validate(login)){
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/userprofile/' + this.authService.user$.getValue().id]);
        },error: (err:any)=>{
          this.wrongCredential = true;
        }
      });
      
    }
  }

  validate(login: Login): boolean {
    this.validUsername = false;
    this.validPassword = false;
    if(login.username != "" && login.password != ""){
      return true;
    }
    if(login.username == ""){
      this.validUsername = true;
    }
    if(login.password == ""){
      this.validPassword = true;
    }
    return false;
  }
  

  changeBiEye() : void{
    if(this.fieldTextType == true){
      this.fieldTextType = false;
    }else{
      this.fieldTextType = true;
    }
    
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleLogin(response : any){
    if(response){
      //decode the token
      const payLoad = this.decodeToken(response.credential)
      //store in session
      console.log(payLoad)
      //sessionStorage.setItem("loggedInUser",JSON.stringify(payLoad));
      console.log(payLoad.email_verified)
      console.log(payLoad.name)
      if(payLoad.email_verified){

      }
      
      //navigate to home/browse
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
