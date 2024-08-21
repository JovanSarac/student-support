import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, Coordinates } from '../model/map.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private baseUrl = 'https://nominatim.openstreetmap.org/reverse';

  constructor(private http: HttpClient) {}

  search(street: string): Observable<Coordinates[]> {
    return this.http.get<Coordinates[]>(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<Address> {
    const url = `${this.baseUrl}?format=json&lat=${lat}&lon=${lon}&accept-language=sr-Latn`;
    return this.http.get<Address>(url);
  }

}
