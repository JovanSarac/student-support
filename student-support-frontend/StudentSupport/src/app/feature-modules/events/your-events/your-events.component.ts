import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../../board/model/myevent.model';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-your-events',
  templateUrl: './your-events.component.html',
  styleUrls: ['./your-events.component.css']
})
export class YourEventsComponent  implements OnInit{

  user! : User;
  
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
    private authService : AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user$.value;
    this.service.getYoursEvents(this.user.id).subscribe({
      next: (result:MyEvent[])=>{
        this.events = result;
        console.log(this.events)
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePagedEvents();
      }
    })
   
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

  onCreateEventClick():void{
    this.router.navigate(['/create-event']);
  }


}
