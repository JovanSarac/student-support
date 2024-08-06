import {
  Component,
  AfterViewInit,
  Input,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './map.service';

@Component({
  selector: 'xp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  public map!: L.Map;
  public markers: L.Marker[] = [];
  public clickStatus: number = 0;
  private lastMarker: L.Marker | undefined;

  @Input() mapId: string = 'map';
  @Input('latitude') initialLatitude: number = 45.2396;
  @Input('longitude') initialLongitude: number = 19.8227;
  @Input('zoom') initialZoom: number = 13;

  @Output() locationSelected: EventEmitter<{ city: string; street: string }> =
    new EventEmitter();
  @Output() locationLatLong: EventEmitter<{ lat: number; lng: number }> =
    new EventEmitter();

  constructor(private mapService: MapService, private cdr: ChangeDetectorRef) {}

  getLastMarker() {
    return this.lastMarker;
  }

  getMarkers(): L.Marker[] {
    return this.markers;
  }

  setStatus(): void {
    this.clickStatus = 1;
    this.cdr.detectChanges();
  }

  private initMap(latitude: number, longitude: number, zoom: number): void {
    this.map = L.map(this.mapId, {
      center: [latitude, longitude],
      zoom: zoom,
      zoomControl: false,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(this.map);

    tiles.addTo(this.map);
    this.map.doubleClickZoom.disable();
  }

  ngAfterViewInit(): void {
    this.initMarkerIcon();
    this.initMap(this.initialLatitude, this.initialLongitude, this.initialZoom);
  }

  private initMarkerIcon(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
    });
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.locationLatLong.emit({ lat, lng });
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        const city = res.address.city;
        const street =
          res.address.road +
          ' ' +
          (res.address.house_number != undefined
            ? res.address.house_number
            : '');
        this.locationSelected.emit({ city, street });
      });
      //console.log('You clicked the map at latitude: ' + lat + ' and longitude: ' + lng);
      if (this.clickStatus == 1) {
        this.clearMarkers();
      }
      this.addMarker(lat, lng);
    });
  }

  setView(latitude: number, longitude: number, zoom: number) {
    this.map.panTo(L.latLng(latitude, longitude), {
      animate: true,
      duration: 1.0,
      easeLinearity: 0.25,
    });
    setTimeout(() => {
      this.map.setZoom(zoom, { animate: true });
    }, 1000);
  }

  addMarker(lat: number, lng: number): void {
    const marker = L.marker([lat, lng], { draggable: false }).addTo(this.map);

    this.lastMarker = marker;

    let markerNum = this.markers.length + 1;
    marker.bindPopup(markerNum.toString());
    this.markers.push(marker);
  }

  clearMarkers(): void {
    this.markers.forEach((marker: L.Marker) => {
      marker?.removeFrom(this.map);
    });
    this.markers = [];
  }
}
