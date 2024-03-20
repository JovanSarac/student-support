import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  logincomponent : boolean = false;

  constructor(
    private router: Router
  ) {}
  loginClick() : void{
    this.router.navigate(['/login']);
  }


}
