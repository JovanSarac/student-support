import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { BoardService } from '../board.service';
import { MyEvent } from '../model/myevent.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { marked } from 'marked';

@Component({
  selector: 'xp-information-board',
  templateUrl: './information-board.component.html',
  styleUrls: ['./information-board.component.css']
})
export class InformationBoardComponent implements OnInit {
  user! : User;
  events : MyEvent[] = [];
  showFullDescription : boolean = false;

  constructor(
    private authService : AuthService,
    private service : BoardService,
  ){}


  ngOnInit(): void {
    this.user = this.authService.user$.getValue();
    this.service.getAllEvenets().subscribe({
      next: (result:PagedResults<MyEvent>)=>{
        this.events = result.results;
      }, complete : () => {
        this.sortEventsByDate()
      }
    })
  }

  sortEventsByDate() {
    this.events.sort((a, b) => {
      const dateA = new Date(a.dateEvent);
      const dateB = new Date(b.dateEvent);
      return dateB.getTime() - dateA.getTime();
    });
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

  formatDate(dateString: Date) {
    const date = new Date(dateString);
    
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  getEventColors(eventType: string): string {
    switch (eventType) {
      case 'AcademicConferenceAndSeminars':
        return 'linear-gradient(to right, rgb(255, 179, 179), rgb(255, 102, 102))';
      case 'WorkshopsAndCourses':
        return 'linear-gradient(to right, rgb(179, 255, 179), rgb(102, 255, 102))';
      case 'CulturalEvent':
        return 'linear-gradient(to right, rgb(255, 255, 179), rgb(255, 255, 102))';
      case 'Fair':
        return 'linear-gradient(to right, rgb(179, 255, 255), rgb(102, 255, 255))';
      case 'HumanitarianEvent':
        return 'linear-gradient(to right, rgb(217, 179, 255), rgb(179, 102, 255))';
      case 'ArtExhibitionsAndPerformances':
        return 'linear-gradient(to right, rgb(209, 209, 224), rgb(164, 164, 193))';
      case 'StudentPartiesAndSocialEvents':
        return 'linear-gradient(to right, rgb(198, 236, 217), rgb(140, 217, 179))';
      case 'Competitions':
        return 'linear-gradient(to right, rgb(236, 198, 198), rgb(217, 140, 140))';
      case 'StudentTrips':
        return 'linear-gradient(to right, rgb(255, 209, 179), rgb(255, 148, 77))';
      default:
        return 'linear-gradient(to right, rgb(151, 216, 134), rgb(63, 204, 82))'; // Default color
    }
  }

  eventTypes: { [key: string]: string } = {
    "AcademicConferenceAndSeminars": "Akademske konferencije i seminari",
    "WorkshopsAndCourses": "Radionice i kursevi",
    "CulturalEvent": "Kultorološki događaj",
    "Fair": "Sajamski događaj",
    "HumanitarianEvent": "Humanitarni događaj",
    "ArtExhibitionsAndPerformances": "Umjetničke izložbe i predstave",
    "StudentPartiesAndSocialEvents": "Studentske žurke i društveni događaji",
    "Competitions": "Takmičenja",
    "StudentTrips": "Studentska putovanja"
  };
  
  getEventType(number: string): string {
    return this.eventTypes[number] || "Nepoznat tip događaja";
  }

  getEventTypeColor(eventType: string): string{
    switch (eventType) {
      case 'AcademicConferenceAndSeminars':
        return 'rgb(255, 26, 26)';
      case 'WorkshopsAndCourses':
        return 'rgb(0, 153, 0)';
      case 'CulturalEvent':
        return 'rgb(153, 153, 0)';
      case 'Fair':
        return 'rgb(0, 153, 153)';
      case 'HumanitarianEvent':
        return 'rgb(77, 0, 153)';
      case 'ArtExhibitionsAndPerformances':
        return 'rgb(62, 62, 91)';
      case 'StudentPartiesAndSocialEvents':
        return 'rgb(38, 115, 77)';
      case 'Competitions':
        return 'rgb(115, 38, 38)';
      case 'StudentTrips':
        return 'rgb(153, 61, 0)';
      default:
        return 'rgb(0,0,0)'; 
    }

  }

}
