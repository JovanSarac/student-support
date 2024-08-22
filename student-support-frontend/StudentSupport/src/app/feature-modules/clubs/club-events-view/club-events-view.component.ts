import { Component, Input, OnInit } from '@angular/core';
import { MyEvent } from '../../board/model/myevent.model';
import { EventsService } from '../../events/events.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-club-events-view',
  templateUrl: './club-events-view.component.html',
  styleUrl: './club-events-view.component.css',
})
export class ClubEventsViewComponent implements OnInit {
  @Input() clubIdInput: number = 0;
  user!: User;
  events: MyEvent[] = [];
  pagedEvents: MyEvent[] = [];
  currentPage = 1;
  totalPages = 1;
  pageSize = 4;
  menuVisibleIndex: number | null = null;

  constructor(
    private eventService: EventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.getAllEvents();
    });
  }

  getAllEvents(): void {
    this.eventService.getAllEvents(this.user).subscribe({
      next: (result: PagedResults<MyEvent>) => {
        this.events = result.results
          .filter((e) => e.clubId === this.clubIdInput)
          .sort(
            (a, b) =>
              new Date(b.datePublication).getTime() -
              new Date(a.datePublication).getTime()
          );
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePagedEvents();
      },
    });
  }

  updatePagedEvents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEvents = this.events.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedEvents();
    }
  }

  onMenuToggle(index: number | null) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedEvents();
    }
  }
}
