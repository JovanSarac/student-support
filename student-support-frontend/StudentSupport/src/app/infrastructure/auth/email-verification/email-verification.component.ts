import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit {
  token: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      console.log('Token:', this.token);
      
      // Sada možete koristiti token za verifikaciju ili druge potrebe
      if(this.token) {
        this.verifyEmail(this.token);
      }
    });
  }

  verifyEmail(token: string): void {
    
  }
}
