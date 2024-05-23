import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { marked } from 'marked';
import { BoardService } from '../board.service';
import { MyEvent } from '../model/myevent.model';
import { Router } from '@angular/router';

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
  formattedDescription: string = '';
  showFullDescription = false;
  event : MyEvent={
    id: 0,
    name: '',
    description: '',
    dateEvent: new Date(),
    address: '',
    eventType: '',
    datePublication: new Date(),
    image: ''
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = reader.result; 
      this.event.image = e.target.result; 
    };
    reader.readAsDataURL(file);
    console.log(file)
  }


  viewOverview() {
    this.overview = true;
    console.log(this.selectedFile)
    console.log(this.selectedImage);
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
    this.event.address = this.eventForm.value.address || '';
    this.event.eventType = this.eventForm.value.type || '';
    this.event.datePublication = new Date();

    console.log(this.event);

    this.service.createEvent(this.event).subscribe({
      next:(result:MyEvent)=>{
        console.log(result);
        this.router.navigate(['info-board']);
      }
    })
  }
}

