import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  MyEvent } from './model/myevent.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private http: HttpClient
  ) { }

  createEvent(event: MyEvent): Observable<MyEvent> {
      return this.http.post<MyEvent>(environment.apiHost + 'author/events', event);
  }

  getAllEvenets(): Observable<PagedResults<MyEvent>> {
      return this.http.get<PagedResults<MyEvent>>(environment.apiHost + 'student/events');
  }
}
