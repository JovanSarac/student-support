import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { marked } from 'marked';
import { BoardService } from '../board.service';
import { MyEvent } from '../model/myevent.model';
import { Router } from '@angular/router';
import { MapComponent } from 'src/app/shared/map/map.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent: MapComponent | undefined;

  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  overview: boolean = false;
  user !: User;
  formattedDescription: string = '';
  showFullDescription = false;
  city: string = '';
  street: string = '';
  latitude: number = 0;
  longitude: number = 0;
  event : MyEvent={
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
    longitude: 0
  };

  dtn = new Date();
  dateTimeNow :string = this.dtn.toString();

  eventForm = new FormGroup({
    type : new FormControl('', Validators.required),
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    address: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient,
    private authService: AuthService,
    private service: BoardService,
    private router : Router,

  ) {}
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    this.mapComponent!.setStatus();
    this.mapComponent!.registerOnClick();
    this.mapComponent!.locationSelected.subscribe((location: { city: string, street: string }) => {
      this.city = location.city;
      this.street = location.street;
    });
    this.mapComponent!.locationLatLong.subscribe((locationLatLng: {lat: number, lng: number})=>{
      this.latitude = locationLatLng.lat;
      this.longitude = locationLatLng.lng;

    });
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

  viewOverview() {
    this.overview = true;
  }

  backToForm(){
    this.overview = false;
  }

  renderMarkdown(description: string): string {
    let markdown: string = description || "";
    return marked(markdown) as string;
  }

  truncateText(text: string, limit: number): string {
    if (text.length > limit) {
      return text.slice(0, limit) + '...';
    }
    return text;
  }

  renderTruncatedMarkdown(description: string, limit: number): string {
    const truncatedText = this.truncateText(description, limit);
    return this.renderMarkdown(truncatedText);
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
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

  createEvent(){
    this.event.name = this.eventForm.value.name || '';
    this.event.description = this.eventForm.value.description || '';
    this.event.dateEvent = new Date(this.eventForm.value.date || '');
    this.event.address = this.street + ', ' + this.city || '';
    this.event.latitude = this.latitude;
    this.event.longitude = this.longitude;
    this.event.eventType = this.eventForm.value.type || '';
    this.event.datePublication = new Date();
    this.event.userId = this.user.id;


    this.service.createEvent(this.event).subscribe({
      next:(result:MyEvent)=>{
        this.router.navigate(['your-events']);
      }
    })
  }

  getEventColors(eventType: string): string {
    switch (eventType) {
      case '0':
        return 'linear-gradient(to right, rgb(255, 179, 179), rgb(255, 102, 102))';
      case '1':
        return 'linear-gradient(to right, rgb(179, 255, 179), rgb(102, 255, 102))';
      case '2':
        return 'linear-gradient(to right, rgb(255, 255, 179), rgb(255, 255, 102))';
      case '3':
        return 'linear-gradient(to right, rgb(179, 255, 255), rgb(102, 255, 255))';
      case '4':
        return 'linear-gradient(to right, rgb(217, 179, 255), rgb(179, 102, 255))';
      case '5':
        return 'linear-gradient(to right, rgb(209, 209, 224), rgb(164, 164, 193))';
      case '6':
        return 'linear-gradient(to right, rgb(198, 236, 217), rgb(140, 217, 179))';
      case '7':
        return 'linear-gradient(to right, rgb(236, 198, 198), rgb(217, 140, 140))';
      case '8':
        return 'linear-gradient(to right, rgb(255, 209, 179), rgb(255, 148, 77))';
      default:
        return 'linear-gradient(to right, rgb(151, 216, 134), rgb(63, 204, 82))'; // Default color
    }
  }

  eventTypes: { [key: string]: string } = {
    "0": "Akademske konferencije i seminari",
    "1": "Radionice i kursevi",
    "2": "Kultorološki događaj",
    "3": "Sajamski događaj",
    "4": "Humanitarni događaj",
    "5": "Umjetničke izložbe i predstave",
    "6": "Studentske žurke i društveni događaji",
    "7": "Takmičenja",
    "8": "Studentska putovanja"
  };
  
  getEventType(number: string): string {
    return this.eventTypes[number] || "Nepoznat tip događaja";
  }

  getEventTypeColor(eventType: string): string{
    switch (eventType) {
      case '0':
        return 'rgb(255, 26, 26)';
      case '1':
        return 'rgb(0, 153, 0)';
      case '2':
        return 'rgb(153, 153, 0)';
      case '3':
        return 'rgb(0, 153, 153)';
      case '4':
        return 'rgb(77, 0, 153)';
      case '5':
        return 'rgb(62, 62, 91)';
      case '6':
        return 'rgb(38, 115, 77)';
      case '7':
        return 'rgb(115, 38, 38)';
      case '8':
        return 'rgb(153, 61, 0)';
      default:
        return 'rgb(0,0,0)'; 
    }

  }
}

