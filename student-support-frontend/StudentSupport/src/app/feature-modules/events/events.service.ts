import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { MyEvent } from '../board/model/myevent.model';
import { environment } from 'src/env/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getAllEvenets(): Observable<PagedResults<MyEvent>> {
    return this.http.get<PagedResults<MyEvent>>(environment.apiHost + 'student/events');
  }

  getYoursEvents(userId : number): Observable<MyEvent[]>{
    return this.http.get<MyEvent[]>(environment.apiHost + 'author/events/get_yours_events/' + userId);
  }
}
