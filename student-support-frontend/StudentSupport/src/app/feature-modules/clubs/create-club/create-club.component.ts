import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { MapComponent } from 'src/app/shared/map/map.component';
import { Club, ClubStatus } from 'src/app/shared/model/club.model';
import { ClubsService } from '../clubs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrl: './create-club.component.css',
})
export class CreateClubComponent implements OnInit, AfterViewInit {
  @ViewChild(MapComponent) mapComponentCreate: MapComponent | undefined;
  @ViewChild('descriptionTextarea') descriptionTextarea!: ElementRef;

  selectedFile: File | null = null;
  selectedImage: string = '';
  user!: User;
  latitude: number = 0;
  longitude: number = 0;
  title: string = 'Kreiraj klub';
  isEditMode: boolean = false;
  club: Club = {
    id: 0,
    name: '',
    description: '',
    ownerId: 0,
    memberships: [],
    eventIds: [],
    status: ClubStatus.Active,
    address: '',
    latitude: 0,
    longitude: 0,
    coverImage: '',
    datePublication: new Date(),
    announcements: [],
  };

  showEmojiPicker: boolean = false;
  notMarker: boolean = false;
  notPicture: boolean = false;
  undefinedStreet: boolean = false;

  dtn = new Date();
  dateTimeNow: string = this.dtn.toString();
  minDate = new Date().toISOString().slice(0, 16);

  clubForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private service: ClubsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();

    this.route.url.subscribe(([url]) => {
      const { path } = url;

      if (path === 'edit-club') {
        this.isEditMode = true;
        this.title = 'Izmeni klub:';

        this.loadClub();
      }
    });
  }

  ngAfterViewInit(): void {
    this.mapComponentCreate!.setStatus();
    this.mapComponentCreate!.registerOnClick();
    this.mapComponentCreate!.locationSelected.subscribe(
      (location: { city: string; street: string }) => {
        this.clubForm.patchValue({
          city: location.city,
          street: location.street,
        });
        this.undefinedStreet = false;
        if (location.street == 'undefined ') {
          this.undefinedStreet = true;
        }
      }
    );
    this.mapComponentCreate!.locationLatLong.subscribe(
      (locationLatLng: { lat: number; lng: number }) => {
        this.latitude = locationLatLng.lat;
        this.longitude = locationLatLng.lng;
      }
    );
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  loadClub(): void {
    const id = Number(this.route.snapshot.paramMap.get('clubId'));

    if (id) {
      this.service.getClubById(this.user, id).subscribe((club) => {
        this.club = club;
        this.updateFormWithClubData();
        // setTimeout(() => {
        //   this.showSlides(this.slideIndex);
        // }, 100);
      });
    }
  }

  createClub() {
    this.markAllControlsAsTouched();

    if (!this.validateMarkerAndPicture()) return;

    if (this.clubForm.invalid) {
      return;
    }
    this.club.name = this.clubForm.value.name || '';
    this.club.description = this.clubForm.value.description || '';
    this.club.address =
      this.clubForm.value.street + ', ' + this.clubForm.value.city || '';
    this.club.latitude = this.latitude;
    this.club.longitude = this.longitude;
    this.club.ownerId = this.user.id;

    this.service.createClub(this.club).subscribe({
      next: (result: Club) => {
        this.toastr.success(
          'Uspješno!',
          'Kreirali ste klub sa nazivom ' + result.name + ' !'
        );
        this.router.navigate(['clubs-page'], {
          queryParams: { activeTab: 'yourClubs' },
        });
      },
    });
  }

  updateClub() {
    this.markAllControlsAsTouched();

    if (!this.validateMarkerAndPicture()) return;

    if (this.clubForm.invalid) {
      return;
    }
    this.club.name = this.clubForm.value.name || '';
    this.club.description = this.clubForm.value.description || '';
    this.club.address =
      this.clubForm.value.street + ', ' + this.clubForm.value.city || '';
    this.club.latitude = this.latitude;
    this.club.longitude = this.longitude;

    this.service.updateClub(this.club).subscribe({
      next: (result: Club) => {
        this.club = result;
        this.toastr.success(
          'Uspešno!',
          'Izmenili ste klub sa nazivom ' + result.name + ' !'
        );
        this.router.navigate([`/single-club/${this.club.id}`]);
      },
    });
  }

  updateFormWithClubData(): void {
    this.clubForm.patchValue({
      name: this.club.name,
      description: this.club.description,
      city: this.getCityFromAddress(this.club.address),
      street: this.getStreetFromAddress(this.club.address),
    });
    this.latitude = this.club.latitude;
    this.longitude = this.club.longitude;
    this.selectedImage = this.club.coverImage;
    this.setMarkerOnMap();
  }

  setMarkerOnMap(): void {
    if (this.mapComponentCreate) {
      this.mapComponentCreate.addMarker(
        this.club.latitude,
        this.club.longitude
      );
      this.mapComponentCreate.setView(
        this.club.latitude,
        this.club.longitude,
        15
      );
    }
  }

  validateMarkerAndPicture(): boolean {
    var br = 0;
    this.notMarker = false;
    this.notPicture = false;
    this.undefinedStreet = false;

    if (this.clubForm.value.street == undefined) {
      this.undefinedStreet = true;
      br++;
    }
    if (this.latitude == 0 || this.longitude == 0) {
      br++;
      this.notMarker = true;
    }
    if (this.club.coverImage == '') {
      this.notPicture = true;
      br++;
    }

    if (br != 0) return false;

    return true;
  }

  private markAllControlsAsTouched(): void {
    Object.values(this.clubForm.controls).forEach((control) => {
      control.markAsTouched();
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

        const compressedImageData = canvas.toDataURL('image/webp', 0.7);

        this.club.coverImage = compressedImageData;
        this.selectedImage = compressedImageData;
      };
    };

    reader.readAsDataURL(file);
  }

  removeImage() {
    if (this.club.coverImage) {
      this.club.coverImage = '';
    }
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

  formatDateForInput(date: string): string {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const hours = String(dt.getHours()).padStart(2, '0');
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    const textarea = this.descriptionTextarea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    this.clubForm.patchValue({
      description:
        this.clubForm.value.description!.slice(0, start) +
        emoji +
        this.clubForm.value.description!.slice(end),
    });
    setTimeout(() => {
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      textarea.focus();
    }, 0);
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    document.getElementById('description')?.focus();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (
      target.closest('.emoji-mart') === null &&
      target.closest('.description__group') === null
    ) {
      this.showEmojiPicker = false;
    }
  }
}
