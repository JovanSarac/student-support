import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';

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
    private router: Router,
    private service: AuthService
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
    this.service.verifyEmail(token).subscribe({
      next: ()=>{
        const jwtHelperService = new JwtHelperService();
        this.email = jwtHelperService.decodeToken(token).email;
        this.name = jwtHelperService.decodeToken(token).name;
      },
      error: (err) => {
        console.error('Verification failed:', err);
      }
    })


  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}
