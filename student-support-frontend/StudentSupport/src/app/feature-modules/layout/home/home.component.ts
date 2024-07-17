import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyEvent } from '../../board/model/myevent.model';
import { LayoutService } from '../layout.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { marked } from 'marked';

@Component({
  selector: 'xp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private service: LayoutService) {}

  selectedTab: string = 'all';
  events: MyEvent[] = [];
  currentPage = 1;
  pageSize = 8;
  pagedEvents: MyEvent[] = [];
  totalPages = 1;
  slideImg: string = '../../../../assets/images/students1.jpg';
  images: string[] = [
    '../../../../assets/images/students1.jpg',
    '../../../../assets/images/students2.jpg',
    '../../../../assets/images/students3.jpg',
  ];
  headers1: string[] = [
    'Doživi pun potencijal studentskih dana.',
    'Teško stičeš prijatelje?',
    'Želiš neke nove aktivnosti?',
  ];
  headers2: string[] = [
    'Pridruži se događajima',
    'Upoznaj ih na raznim dešavanjima',
    'Učlani se u mnoge klubove',
  ];
  header1: string = 'Doživi pun potencijal studentskih dana.';
  header2: string = 'Pridruži se događajima';
  currentIndex: number = 0;
  isFading: boolean = false;

  isDropdownVisible: boolean = false;
  dropdownOpen = false;

  eventType: { [key: string]: string } = {
    AcademicConferenceAndSeminars: 'Konferencije',
    WorkshopsAndCourses: 'Kursevi',
    CulturalEvent: 'Kulturni',
    Fair: 'Sajamski',
    HumanitarianEvent: 'Humanitarni',
    ArtExhibitionsAndPerformances: 'Umjetnicki',
    StudentPartiesAndSocialEvents: 'Drustveni',
    Competitions: 'Takmicenja',
    StudentTrips: 'Putovanja',
  };

  eventTypeColors: { [key: string]: string } = {
    AcademicConferenceAndSeminars: '#429D66',
    WorkshopsAndCourses: ' #FF4D4D',
    CulturalEvent: '#00BFFF',
    Fair: '#FF9501',
    HumanitarianEvent: '#FFD700',
    ArtExhibitionsAndPerformances: '#DF80FF',
    StudentPartiesAndSocialEvents: '#66CDAA',
    Competitions: '#FFA07A',
    StudentTrips: 'rgb(61,61,254)',
  };

  ngOnInit() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
    this.startSlider();
    this.service.getAllEvenets().subscribe({
      next: (result: PagedResults<MyEvent>) => {
        this.events = result.results;
        this.totalPages = Math.ceil(this.events.length / this.pageSize);
        this.updatePagedEvents();
      },
    });
  }

  checkScreenWidth() {
    this.isDropdownVisible = window.innerWidth <= 850;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      !(event.target as HTMLElement).closest('.burger-icon') &&
      !(event.target as HTMLElement).closest('.dropdown-content')
    ) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigate(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'događaji') {
      // navigacija na događaje
    } else if (selectedValue === 'funkcionalnosti') {
      // navigacija na funkcionalnosti
    } else if (selectedValue === 'faq') {
      // navigacija na FAQ
    } else if (selectedValue === 'o nama') {
      // navigacija na O nama
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.currentPage = 1; // Reset page to 1 when tab is selected
    this.updatePagedEvents();
  }

  updatePagedEvents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEvents = this.events.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedEvents();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedEvents();
    }
  }

  renderMarkdown(description: string): string {
    let markdown: string = description || '';
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

  loginClick(): void {
    this.router.navigate(['/login']);
  }

  // startSlider() {
  //   setInterval(() => {
  //     this.currentIndex = (this.currentIndex + 1) % this.images.length;
  //     this.slideImg = this.images[this.currentIndex];
  //   }, 3000);
  // }

  startSlider() {
    setInterval(() => {
      this.isFading = true;
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.slideImg = this.images[this.currentIndex];
        this.header1 = this.headers1[this.currentIndex];
        this.header2 = this.headers2[this.currentIndex];
        this.isFading = false;
      }, 1500);
    }, 6000);
  }
}
