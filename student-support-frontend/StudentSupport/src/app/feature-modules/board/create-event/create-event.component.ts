import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { marked } from 'marked';
import { BoardService } from '../board.service';
import { MyEvent } from '../model/myevent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';
import { EventsService } from '../../events/events.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  @ViewChild(MapComponent) mapComponentCreate: MapComponent | undefined;
  @ViewChild('descriptionTextarea') descriptionTextarea!: ElementRef;

  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  user!: User;
  latitude: number = 0;
  longitude: number = 0;
  title : string = "Kreiraj događaj";
  isEditMode: boolean = false;
  event: MyEvent = {
    id: 0,
    name: '',
    description: '',
    dateEvent: new Date(),
    address: '',
    eventType: '',
    datePublication: new Date(),
    image: '',
    userId: 0,
    latitude: 0,
    longitude: 0,
    isArchived: false,
  };
  showEmojiPicker: boolean = false;

  eventTypeMap = [
    { value: 'AcademicConferenceAndSeminars', numericValue: '0' },
    { value: 'WorkshopsAndCourses', numericValue: '1' },
    { value: 'CulturalEvent', numericValue: '2' },
    { value: 'Fair', numericValue: '3' },
    { value: 'HumanitarianEvent', numericValue: '4' },
    { value: 'ArtExhibitionsAndPerformances', numericValue: '5' },
    { value: 'StudentPartiesAndSocialEvents', numericValue: '6' },
    { value: 'Competitions', numericValue: '7' },
    { value: 'StudentTrips', numericValue: '8' },
  ];

  dtn = new Date();
  dateTimeNow: string = this.dtn.toString();

  eventForm = new FormGroup({
    type: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required), // Dodato
    street: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private service: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private eventService : EventsService,
  ) {}


  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    this.route.url.subscribe(([url]) => {
      const { path } = url;
  
      if (path === 'edit-event') {
        this.isEditMode = true;
        this.title = 'Izmjeni događaj:';
        
        this.loadEvent();
      }
    });
  }

  loadEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('eventId'));

    if (id) {
      this.eventService.getEventById(this.user, id).subscribe(event => {
        this.event = event;
        this.updateFormWithEventData();
      });
    }
    
  }

  updateFormWithEventData(): void {
    this.eventForm.patchValue({
      type: this.getNumericValue(this.event.eventType),
      name: this.event.name,
      description: this.event.description,
      city: this.getCityFromAddress(this.event.address),
      street: this.getStreetFromAddress(this.event.address),
      date: this.formatDateForInput(this.event.dateEvent.toString()),
    });
    this.latitude = this.event.latitude;
    this.longitude = this.event.longitude;
    this.selectedImage = this.event.image;
    this.setMarkerOnMap()
  }

  getNumericValue(eventType: string): string {
    const found = this.eventTypeMap.find(type => type.value === eventType);
    return found ? found.numericValue : '';
  }


  setMarkerOnMap(): void {
    if (this.mapComponentCreate) {
      this.mapComponentCreate.addMarker(this.event.latitude, this.event.longitude);
      this.mapComponentCreate.setView(this.event.latitude, this.event.longitude, 15);
    }
  }

  formatDateForInput(date: string): string {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const hours = String(dt.getHours()).padStart(2, '0');
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  ngAfterViewInit(): void {
    this.mapComponentCreate!.setStatus();
    this.mapComponentCreate!.registerOnClick();
    this.mapComponentCreate!.locationSelected.subscribe(
      (location: { city: string; street: string }) => {
        this.eventForm.patchValue({
          city: location.city,
          street: location.street,
        });
      }
    );
    this.mapComponentCreate!.locationLatLong.subscribe(
      (locationLatLng: { lat: number; lng: number }) => {
        this.latitude = locationLatLng.lat;
        this.longitude = locationLatLng.lng;
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Podesi dimenzije na osnovu maksimalne veličine
        const maxWidth = 700;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

        // Proporcionalno smanjenje dimenzija
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        // Dalje smanjenje kvaliteta slike
        const compressedImageData = canvas.toDataURL('image/webp', 0.7); // Pokušaj sa 0.3 za dalju kompresiju

        this.selectedImage = compressedImageData;
        this.event.image = compressedImageData;
      };
    };

    reader.readAsDataURL(file);
  }

  getCityFromAddress(address: string): string {
    return address.split(', ')[1];
  }

  getStreetFromAddress(address: string): string {
    return address.split(', ')[0];
  }


  formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }


  addEmoji(event: any) {
    const emoji = event.emoji.native;
    const textarea = this.descriptionTextarea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    this.eventForm.patchValue({
      description: this.eventForm.value.description!.slice(0, start) + emoji + this.eventForm.value.description!.slice(end)
    });
    setTimeout(() => {
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      textarea.focus();
    }, 0);
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    document.getElementById("description")?.focus();
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.emoji-mart') === null && target.closest('.description__group') === null) {
      this.showEmojiPicker = false;
    }
  }

  createEvent() {
    this.event.name = this.eventForm.value.name || '';
    this.event.description = this.eventForm.value.description || '';
    this.event.dateEvent = new Date(this.eventForm.value.date || '');
    this.event.address = this.eventForm.value.street + ', ' + this.eventForm.value.city || '';
    this.event.latitude = this.latitude;
    this.event.longitude = this.longitude;
    this.event.eventType = this.eventForm.value.type || '';
    this.event.datePublication = new Date();
    this.event.userId = this.user.id;

    console.log(this.event)

    this.service.createEvent(this.event).subscribe({
      next: (result: MyEvent) => {
        this.router.navigate(['your-events']);
      },
    });
  }

  updateEvent(){
    this.event.name = this.eventForm.value.name || '';
    this.event.description = this.eventForm.value.description || '';
    this.event.dateEvent = new Date(this.eventForm.value.date || '');
    this.event.address = this.eventForm.value.street + ', ' + this.eventForm.value.city || '';
    this.event.latitude = this.latitude;
    this.event.longitude = this.longitude;
    this.event.eventType = this.eventForm.value.type || '';

    this.eventService.updateEvent(this.event).subscribe({
      next: (result:MyEvent) =>{
        this.event = result
      }
    })
  }
}
