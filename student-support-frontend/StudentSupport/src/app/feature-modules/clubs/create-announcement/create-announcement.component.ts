import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Announcement } from 'src/app/shared/model/announcement.model';
import { ClubsService } from '../clubs.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrl: './create-announcement.component.css',
})
export class CreateAnnouncementComponent implements OnInit {
  @ViewChild('descriptionTextarea') descriptionTextarea!: ElementRef;
  @Output() announcementsUpdated: EventEmitter<void> = new EventEmitter<void>();
  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;
  user!: User;
  title: string = 'Kreiraj obaveštenje';
  isEditMode: boolean = false;

  announcement: Announcement = {
    id: 0,
    announcerId: 0,
    clubId: 0,
    content: '',
    images: [],
    publicationDate: new Date(),
  };

  showEmojiPicker: boolean = false;
  notPicture: boolean = false;
  slideIndex: number = 1;

  announcementForm = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(1500),
    ]),
  });

  constructor(
    private authService: AuthService,
    private service: ClubsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: string; clubId: number; announcementId: number },
    public dialogRef: MatDialogRef<CreateAnnouncementComponent>
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();

    if (this.data.mode === 'edit-announcement') {
      this.isEditMode = true;
      this.title = 'Izmeni obaveštenje:';

      this.loadAnnouncement();
    }
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  loadAnnouncement(): void {
    if (this.data.announcementId !== 0) {
      this.service
        .getAnnouncementById(this.user, this.data.announcementId)
        .subscribe((announcement) => {
          this.announcement = announcement;
          this.updateFormWithAnnouncementData();
        });
    }
  }

  createAnnouncement() {
    this.markAllControlsAsTouched();

    if (!this.validatedPicture()) return;

    if (this.announcementForm.invalid) {
      return;
    }
    this.announcement.content = this.announcementForm.value.content || '';
    this.announcement.announcerId = this.user.id;
    this.announcement.publicationDate = new Date();
    this.announcement.clubId = this.data.clubId;
    this.service.createAnnouncement(this.user, this.announcement).subscribe({
      next: (result: Announcement) => {
        this.toastr.success('Uspešno!', 'Kreirali ste obaveštenje.');
        this.announcementsUpdated.emit();
        this.closeDialog();
      },
    });
  }

  updateAnnouncement() {
    this.markAllControlsAsTouched();

    if (!this.validatedPicture()) return;

    if (this.announcementForm.invalid) {
      return;
    }
    this.announcement.content = this.announcementForm.value.content || '';

    this.service.updateAnnouncement(this.user, this.announcement).subscribe({
      next: (result: Announcement) => {
        this.toastr.success('Uspešno!', 'Izmenili ste obaveštenje.');
        this.announcementsUpdated.emit();
        this.closeDialog();
      },
    });
  }

  updateFormWithAnnouncementData(): void {
    this.announcementForm.patchValue({
      content: this.announcement.content,
    });
    this.selectedImage = this.announcement.images[0];
  }

  closeDialog() {
    this.dialogRef.close();
  }

  validatedPicture(): boolean {
    var br = 0;
    this.notPicture = false;

    if (this.announcement.images[0] == '') {
      this.notPicture = true;
      br++;
    }

    if (br != 0) return false;

    return true;
  }

  private markAllControlsAsTouched(): void {
    Object.values(this.announcementForm.controls).forEach((control) => {
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

        // Dalje smanjenje kvaliteta slike
        const compressedImageData = canvas.toDataURL('image/webp', 0.7); // Pokušaj sa 0.3 za dalju kompresiju
        this.announcement.images.push(compressedImageData);
        this.slideIndex = this.announcement.images.length;
        setTimeout(() => {
          this.showSlides(this.slideIndex);
        }, 100);
      };
    };

    reader.readAsDataURL(file);
  }

  plusSlides(n: number): void {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: number): void {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: number): void {
    var slides = document.getElementsByClassName(
      'mySlides'
    ) as HTMLCollectionOf<HTMLElement>;
    var dots = document.getElementsByClassName('demo');

    if (n > this.announcement.images.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }

  removeImage(index: number) {
    if (index > -1 && index < this.announcement.images.length) {
      this.announcement.images.splice(index, 1);
      if (this.announcement.images.length > 0) {
        setTimeout(() => {
          this.showSlides(index + 1);
        }, 100);
      }
    }
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    const textarea = this.descriptionTextarea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    this.announcementForm.patchValue({
      content:
        this.announcementForm.value.content!.slice(0, start) +
        emoji +
        this.announcementForm.value.content!.slice(end),
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
