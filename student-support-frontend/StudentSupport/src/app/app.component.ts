import { Component, OnInit } from '@angular/core';
import { AuthService } from './infrastructure/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'StudentSupport';

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}


  ngOnInit(): void {
    this.checkIfUserExists();
  }
  
  private checkIfUserExists(): void {
    this.authService.checkIfUserExists();
  }
}
