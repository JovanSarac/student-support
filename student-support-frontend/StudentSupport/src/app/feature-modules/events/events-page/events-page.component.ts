import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../../board/model/myevent.model';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Participation } from 'src/app/shared/model/participation-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css'],
})
export class EventsPageComponent implements OnInit {
  selected!: Date;
  events: MyEvent[] = [];
  currentPage = 1;
  pageSize = 20;
  pagedEvents: MyEvent[] = [];
  participations: Participation[] = [];
  totalPages = 1;
  user!: User;
  searchControl = new FormControl('');
  activeTab: string = 'allEvents';

  filterCont = new FormControl('');
  selectedDateRange: string = '0';

  form: FormGroup | undefined;
  selectedDate = []

  //range: DateRange = { start: new Date(), end: new Date() };
  
  
  constructor(
    private router: Router,
    private service: EventsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.service.getAllEvents().subscribe({
      next: (result: PagedResults<MyEvent>) => {
        if (this.user.role === 'student') {
          this.events = result.results.filter((e) => !e.isArchived);
        } else {
          this.events = result.results;
        }
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePagedEvents();
      },
    });
  }

  getParticipationsByStudentId(): void {
    this.service.getAllParticipationsByStudentId(this.user.id).subscribe({
      next: (result: Participation[]) => {
        this.participations = result;
      },
    });
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user.role === 'student') this.getParticipationsByStudentId();
    });
  }

  selectTab(tab: string) {
    this.currentPage = 1; // Reset page to 1 when tab is selected
    this.updatePagedEvents();
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

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedEvents();
    }
  }

  createEvent(){
    this.router.navigate(['create-event']);

  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if(tab == "allEvents"){
      this.getAllEvents();
    }else if(tab == "yourEvents"){
      this.service.getYoursEvents(this.user.id).subscribe({
        next: (result: MyEvent[]) => {
          this.events = result;
          this.totalPages = Math.ceil(this.events.length / this.pageSize);
          this.updatePagedEvents();
        },
      });
    }else if(tab =="yourInterests"){
      this.service.getYoursParticipateEvents(this.user.id).subscribe({
        next: (result: MyEvent[]) => {
          this.events = result;
          this.totalPages = Math.ceil(this.events.length / this.pageSize);
          this.updatePagedEvents();
        },
      });
    }
  }


}
