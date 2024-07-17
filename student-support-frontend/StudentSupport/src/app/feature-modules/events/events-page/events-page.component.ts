import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../../board/model/myevent.model';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit{

  selected!: Date;  

  events : MyEvent[] =  [];
  currentPage = 1;
  pageSize = 8;
  pagedEvents: MyEvent[] = [];
  totalPages = 1;

  eventType: { [key: string]: string } = {
    'AcademicConferenceAndSeminars': 'Konferencije',
    'WorkshopsAndCourses': 'Kursevi',
    'CulturalEvent': 'Kulturni',
    'Fair' : 'Sajamski',
    'HumanitarianEvent' : 'Humanitarni',
    'ArtExhibitionsAndPerformances' : 'Umjetnicki',
    'StudentPartiesAndSocialEvents' : 'Drustveni',
    'Competitions' : 'Takmicenja',
    'StudentTrips' : 'Putovanja'
  };

  eventTypeColors: { [key: string]: string } = {
    'AcademicConferenceAndSeminars': '#429D66',
    'WorkshopsAndCourses': ' #FF4D4D',
    'CulturalEvent': '#00BFFF',
    'Fair' : '#FF9501',
    'HumanitarianEvent' : '#FFD700',
    'ArtExhibitionsAndPerformances' : '#DF80FF',
    'StudentPartiesAndSocialEvents' : '#66CDAA',
    'Competitions' : '#FFA07A',
    'StudentTrips' : 'rgb(61,61,254)'
  };

  constructor(
    private router: Router,
    private service : EventsService,
  ) {}


  ngOnInit(): void {
    this.service.getAllEvenets().subscribe({
      next: (result:PagedResults<MyEvent>)=>{
        this.events = result.results;
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePagedEvents();
      }
    })
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



}
