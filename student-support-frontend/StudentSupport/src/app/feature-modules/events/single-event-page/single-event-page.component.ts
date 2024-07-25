import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyEvent } from '../../board/model/myevent.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-single-event-page',
  templateUrl: './single-event-page.component.html',
  styleUrls: ['./single-event-page.component.css'],
})
export class SingleEventPageComponent implements OnInit {
  eventId: number = 0;
  event: MyEvent = {
    id: 0,
    name: '',
    userId: 0,
    description: '',
    dateEvent: new Date(),
    datePublication: new Date(),
    address: '',
    image: '',
    eventType: '',
    latitude: 0,
    longitude: 0,
  };

  constructor(private route: ActivatedRoute, private service: EventsService) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.getEventById();
  }

  getEventById(): void {
    this.service.getEventById(this.eventId).subscribe({
      next: (result: MyEvent) => {
        this.event = result;
        console.log(this.event);
      },
    });
  }
}
