import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../../board/model/myevent.model';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  events: MyEvent[] = [];
  eventsForDisplay : MyEvent [] = [];
  currentPage = 1;
  pageSize = 20;
  pagedEvents: MyEvent[] = [];
  participations: Participation[] = [];
  totalPages = 1;
  user!: User;
  searchControl = new FormControl('');
  activeTab: string = 'allEvents';

  searchName: string | null = "";

  
  constructor(
    private router: Router,
    private service: EventsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.route.queryParams.subscribe(params => {
      if(params['activeTab'] != undefined){
        this.setActiveTab(params['activeTab']);
      }
      else{
        this.router.navigate(['/events-page'], { queryParams: { activeTab: this.activeTab } });
      }
      this.searchName = params['searchName'] || "";
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
    this.pagedEvents = this.eventsForDisplay.slice(startIndex, endIndex);
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

  changeActiveTab(tab: string) {
    this.searchControl.setValue('');
    this.searchName = '';
    this.router.navigate(['/events-page'], { queryParams: { activeTab: tab } });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;

    if(tab == "allEvents"){
      this.service.getAllEvents(this.authService.user$.value).subscribe({
        next: (result: PagedResults<MyEvent>) => {
          if (this.user.role === 'student') {
            this.events = result.results.filter((e) => !e.isArchived);
          } else {
            this.events = result.results;
          }
          this.totalPages = Math.ceil(this.events.length / this.pageSize);

          this.searchEventsByName(this.searchName)
        },
      });
    }else if(tab == "yourEvents"){
      this.service.getYoursEvents(this.user.id).subscribe({
        next: (result: MyEvent[]) => {
          this.events = result;
          this.totalPages = Math.ceil(this.events.length / this.pageSize);

          this.searchEventsByName(this.searchName)

        },
      });
    }else if(tab =="yourInterests"){
      this.service.getYoursParticipateEvents(this.user.id).subscribe({
        next: (result: MyEvent[]) => {
          this.events = result;
          this.totalPages = Math.ceil(this.events.length / this.pageSize);

          this.searchEventsByName(this.searchName)
        },
      });
    }
  }

  searchEventsByName(name: string | null){
    this.service.getEventsBySearchName(this.events, name, this.user).subscribe({
      next: (result: MyEvent[])=>{
        this.eventsForDisplay = result;
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePagedEvents();
      }
    })
  }

  searchEvent(name: string){
    if(name != "")
      this.router.navigate(['/events-page'], { queryParams: { searchName: name , activeTab: this.activeTab } });
    else
      this.router.navigate(['/events-page'], { queryParams: { activeTab: this.activeTab } });
  }

  clearSearchName(){
    this.searchControl.setValue('');
    this.searchName = '';
    this.router.navigate(['/events-page'], { queryParams: { activeTab: this.activeTab } });
  }



  onCheckboxChange() {
    const checkedValues = this.getCheckedCheckboxes();
    this.service.getEventsByFilters(this.events, checkedValues, this.user).subscribe({
      next: (result : MyEvent[])=>{
        this.eventsForDisplay = result;
        this.updatePagedEvents();
      }
    })
  }

  getCheckedCheckboxes(): string[] {
    const checkedValues: string[] = [];
    const checkboxes = document.querySelectorAll('.event-checkbox:checked');
  
    checkboxes.forEach((checkbox: any) => {
      checkedValues.push(checkbox.value);
    });
  
    return checkedValues;
  }
}
