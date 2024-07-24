declare var google : any;
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { Registration, RegistrationGmail } from '../model/registration.model';

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
          this.router.navigate(['/']);
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

      if(payLoad.email_verified){

        const registration: RegistrationGmail = {
          name: payLoad.given_name || "",
          surname: payLoad.family_name || "",
          email: payLoad.email || "",
          profilePic: payLoad.picture || "",
        };
        
        this.authService.loginStudentGmail(registration).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
        });


      }
    
    }
  }

  registerClick() : void{
    this.router.navigate(['/register']);
  }
}
