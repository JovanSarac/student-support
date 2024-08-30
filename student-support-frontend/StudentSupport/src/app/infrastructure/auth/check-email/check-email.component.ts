import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrl: './check-email.component.css'
})
export class CheckEmailComponent implements OnInit{
  email: string = "";
  username: string = "";
  role: string = "";

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || "";
      this.username = params['username'] || "";
      this.role = params['role'] || "";
    });

    console.log(this.role)
    if(this.email == "" || this.username == "" || this.role == ""){
      this.router.navigate(['/'])
    }
  }
}
