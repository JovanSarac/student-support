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

  ngOnInit() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
    this.startSlider();
    this.getAllEvents();
  }

  getAllEvents(): void {
    this.service.getAllEvenets().subscribe({
      next: (result: PagedResults<MyEvent>) => {
        this.events = result.results.filter((e) => !e.isArchived);
      },
    });
  }

  showSingleEvent(eventId: number): void {
    this.router.navigate([`/single-event/${eventId}`]);
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

  selectTab(tab: string) {
    this.selectedTab = tab;
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
