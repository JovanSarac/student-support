import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { BoardService } from '../board.service';
import { MyEvent } from '../model/myevent.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { marked } from 'marked';

@Component({
  selector: 'xp-information-board',
  templateUrl: './information-board.component.html',
  styleUrls: ['./information-board.component.css']
})
export class InformationBoardComponent implements OnInit {
  user! : User;

  constructor(
    private authService : AuthService,
    private service : BoardService,
  ){}


  ngOnInit(): void {
    this.user = this.authService.user$.getValue();
  }

  

}
