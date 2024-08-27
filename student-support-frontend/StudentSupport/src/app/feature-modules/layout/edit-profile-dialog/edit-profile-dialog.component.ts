import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { LayoutService } from '../layout.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from '../model/person.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {
  person :Person={
    id: 0,
    name: '',
    surname: '',
    email: '',
  }

  personForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthdate: new FormControl(this.person.birthDate ? this.person.birthDate : undefined),
    phonenumber: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    biography: new FormControl('')
    
  });

  city: string ="";
  street: string = "";
  @ViewChild('biographyTextarea') biographyTextarea!: ElementRef;
  showEmojiPicker: boolean = false;
  user!: User;

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
    private service : LayoutService,
    private authService : AuthService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.user = this.authService.user$.value;
    this.person = this.data;
    if(this.person.address != null){
      const parts = this.person.address.split(',');
      this.street = parts[0]; 
      this.city = parts[1]; 
    }
    this.personForm.patchValue({
      name: this.person.name,
      surname: this.person.surname,
      birthdate: this.person.birthDate ? this.person.birthDate : undefined,
      phonenumber: this.person.phoneNumber,
      street: this.street,
      city: this.city,
      biography: this.person.biography
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  formatDateForInput(date: string): string {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    const textarea = this.biographyTextarea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    this.personForm.patchValue({
      biography:
        this.personForm.value.biography!.slice(0, start) +
        emoji +
        this.personForm.value.biography!.slice(end),
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
      target.closest('.biography__group') === null
    ) {
      this.showEmojiPicker = false;
    }
  }

  editPerson(){
    if(this.personForm.valid){
      this.person.address = this.personForm.value.street + "," + this.personForm.value.city;
      this.person.name = this.personForm.value.name!;
      this.person.surname = this.personForm.value.surname!;
      this.person.birthDate = this.personForm.value.birthdate ? this.personForm.value.birthdate : null;
      this.person.phoneNumber = this.personForm.value.phonenumber!;
      this.person.biography = this.personForm.value.biography!;


      this.service.updatePerson(this.user,this.person).subscribe({
        next:(result:Person)=>{
          this.person = result;
          this.toastr.success("Uspešno ste izmenili podatke o svom profilu!", "Uspešno!")
          this.closeDialog();
        }
      })

    }
  }
}
