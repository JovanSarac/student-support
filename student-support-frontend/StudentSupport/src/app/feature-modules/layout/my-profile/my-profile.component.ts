import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Person } from '../model/person.model';
import { LayoutService } from '../layout.service';
import { DatePipe } from '@angular/common';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  providers: [DatePipe],
})
export class MyProfileComponent implements OnInit {
  @ViewChild('biographyTextarea') biographyTextarea!: ElementRef;

  loggedUser!: User;
  user: User = {
    id: 0,
    username: '',
    role: '',
  };
  urlPersonId: number = 0;
  person: Person = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    profilePicBase64: '',
  };
  selectedProfilePic: string = '';
  defaultProfilePic: string = '../../assets/images/profile-pic.jpg';
  city: string = '';
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private service: LayoutService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loggedUser = this.authService.user$.value;

    this.route.params.subscribe((params) => {
      this.urlPersonId = +params['userId'];
      this.loadProfile();
      this.loadUser();
    });
  }

  loadUser(): void {
    this.service.getUserById(this.loggedUser, this.urlPersonId).subscribe({
      next: (result: User) => {
        this.user = result;
      },
    });
  }

  loadProfile(): void {
    this.service.getPersonById(this.loggedUser, this.urlPersonId).subscribe({
      next: (result: Person) => {
        this.person = result;
      },
    });
  }

  onImageSelected(event: any) {
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

        // Ukloni Base64 prefiks pre nego što postavite u person
        this.selectedProfilePic = compressedImageData;
        this.person.profilePicBase64 = compressedImageData;

        // Pozovite updatePerson nakon što je slika obrađena
        this.service.updatePerson(this.loggedUser, this.person).subscribe({
          next: (result: Person) => {
            this.toastrService.success(
              'Uspešno ste izmenili sliku na profilu!',
              'Uspešno'
            );
          },
        });
      };
    };

    reader.readAsDataURL(file);
  }

  getFormattedDate(date: Date): string | null {
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  getFormattedDateClassic(date: Date): string | null {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }

  openEditDialog(person: Person) {
    let dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '800px',
      height: '800px',
      data: this.person,
      panelClass: 'custom-modalbox',
    });
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    fileInput.click();
  }

  addHover() {
    const label = document.querySelector('.profile-pic .-label');
    if (label) {
      label.classList.add('hover');
    }
  }

  removeHover() {
    const label = document.querySelector('.profile-pic .-label');
    if (label) {
      label.classList.remove('hover');
    }
  }
}
