import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  selectedFile: File | null = null;
  selectedImage: string | ArrayBuffer | null = null;

  overview: boolean = false;

  user !: User;

  eventForm = new FormGroup({
    type : new FormControl('', Validators.required),
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    address: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient,
    private authService: AuthService,

  ) {}
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = e => this.selectedImage = reader.result;
    reader.readAsDataURL(file);
    console.log(file)
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post('http://your-backend-url/upload', formData).subscribe(response => {
        console.log('Upload success', response);
      }, error => {
        console.error('Upload error', error);
      });
    }
  }


  viewOverview(){
    //if(this.eventForm.valid){
      this.overview = true;
    //}
  }
}
