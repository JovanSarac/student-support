import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit {
  token: string | null = null;
  username: string = "";
  email: string = "";
  name: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      
      // Sada možete koristiti token za verifikaciju ili druge potrebe
      if(this.token) {
        this.verifyEmail(this.token);
      }
      else{
        this.router.navigate(['/'])
      }
    });
  }

  verifyEmail(token: string): void {
    const jwtHelperService = new JwtHelperService();
    this.email = jwtHelperService.decodeToken(token).email;
    this.name = jwtHelperService.decodeToken(token).name;


  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}
