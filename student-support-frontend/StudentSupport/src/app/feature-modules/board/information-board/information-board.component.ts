import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-information-board',
  templateUrl: './information-board.component.html',
  styleUrls: ['./information-board.component.css']
})
export class InformationBoardComponent implements OnInit {
  user! : User;

  constructor(
    private authService : AuthService
  ){}


  ngOnInit(): void {
    this.user = this.authService.user$.getValue();
  }

}
