import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Club, ClubStatus } from '../../model/club.model';
import { Router } from '@angular/router';
import { ClubsService } from 'src/app/feature-modules/clubs/clubs.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { marked } from 'marked';

@Component({
  selector: 'xp-club-card',
  templateUrl: './club-card.component.html',
  styleUrl: './club-card.component.css',
})
export class ClubCardComponent implements OnInit {
  @Input() club: Club = {
    id: 0,
    name: '',
    description: '',
    ownerId: 0,
    memberships: [],
    eventIds: [],
    status: ClubStatus.Active,
    address: '',
    latitude: 0,
    longitude: 0,
    coverImage: '',
    datePublication: new Date(),
    announcements: [],
  };

  user!: User;

  constructor(
    public router: Router,
    private service: ClubsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user$.value;
  }

  showSingleClub(): void {
    this.router.navigate([`/single-club/${this.club.id}`]);
  }

  get convertedDescription() {
    return marked(this.club.description);
  }
}
