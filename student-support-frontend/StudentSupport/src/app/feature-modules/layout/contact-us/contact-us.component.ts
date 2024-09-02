import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from '../layout.service';
import { ContactMessage } from '../model/contact-message.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

  constructor(
    private service:LayoutService,
    private toastr: ToastrService,
  ){}

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  sendMessage(){
    this.markAllControlsAsTouched();

    if(this.contactForm.invalid){
      return
    }

    const message : ContactMessage = {
      id: 0,
      senderName: this.contactForm.value.name!,
      senderSurname: this.contactForm.value.surname!,
      senderEmail: this.contactForm.value.email!,
      messageContent: this.contactForm.value.message!,
      SentDate: new Date(),
      isRead: false
    }

    this.service.sendContactMessage(message).subscribe({
      next: ()=>{
        this.toastr.success("Vaša poruka je uspešno poslata. Očekujte naš odgovor na e-mail u najkraćem mogućem roku.", "Uspešno")
        this.contactForm.reset();
      },
      error: (err) => {
        this.toastr.error("Došlo je do greške prilikom slanja poruke. Molimo pokušajte ponovo.", "Greška");
        console.error("Error sending message:", err);
      }
    })

  }

  private markAllControlsAsTouched(): void {
    Object.values(this.contactForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

}
