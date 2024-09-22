import { Component, OnInit } from '@angular/core';
import { MyEvent } from '../model/myevent.model';
import { EventsService } from '../events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Participation } from 'src/app/shared/model/participation-model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css'],
})
export class EventsPageComponent implements OnInit {
  events: MyEvent[] = [];
  eventsForDisplay: MyEvent[] = [];
  currentPage = 1;
  pageSize = 20;
  pagedEvents: MyEvent[] = [];
  menuVisibleIndex: number | null = null;
  participations: Participation[] = [];
  totalPages = 1;
  user!: User;
  searchControl = new FormControl('');
  activeTab: string = 'allEvents';

  searchName: string | null = '';
  selectedCheckboxes: string[] = [];

  showEmptySeachPlaceholder: boolean = false;
  isLoading: boolean = false;

  eventType: { [key: string]: string } = {
    AcademicConferenceAndSeminars: 'Konferencije',
    WorkshopsAndCourses: 'Kursevi',
    CulturalEvent: 'Kulturni',
    Fair: 'Sajamski',
    HumanitarianEvent: 'Humanitarni',
    ArtExhibitionsAndPerformances: 'Umetnički',
    StudentPartiesAndSocialEvents: 'Društveni',
    Competitions: 'Takmičenja',
    StudentTrips: 'Putovanja',
    Other: 'Ostalo',
  };

  dateEvent: { [key: string]: string } = {
    today: 'Danas',
    tommorow: 'Sutra',
    thisweek: 'Ove sedmice',
    thismonth: 'Ovaj mesec',
    pickdate: 'Opseg',
  };

  priceEvent: { [key: string]: string } = {
    free: 'Besplatno',
    paid: 'Plaća se',
  };

  selectedDateFilter: string = '';
  selectDate: number = 0;
  startDate: Date | null = null;
  endDate: Date | null = null;

  selectedPriceFilter: string = '';
  selectPrice: number = 0;

  dropdownOpen = false;
  public screenWidth: number | undefined;

  constructor(
    private router: Router,
    private service: EventsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.screenWidth = window.innerWidth;
    this.getLoggedUser();

    this.route.queryParams.subscribe((params) => {
      this.handleQueryParamsChange(params);
    });
  }

  handleQueryParamsChange(params: any) {
    this.dropdownOpen = false
    if (params['activeTab'] != undefined) {
      this.setActiveTab(params['activeTab']);
    } else {
      this.router.navigate(['/events-page'], {
        queryParams: { activeTab: this.activeTab },
      });
    }
    this.searchName = params['searchName'] || '';
    if (this.searchName != '') this.searchControl.setValue(this.searchName);

    this.selectedCheckboxes = Array.isArray(params['filterTypes'])
      ? params['filterTypes']
      : params['filterTypes']
      ? [params['filterTypes']]
      : [];

    this.selectedDateFilter = params['filterDates'] || '';

    this.startDate = params['startDate'] || null;
    this.endDate = params['endDate'] || null;
    this.selectDate = 0;
    if (this.selectedDateFilter != '') this.selectDate = 1;

    this.selectedPriceFilter = params['filterPrice'] || '';
    this.selectPrice = 0;
    if (this.selectedPriceFilter != '') this.selectPrice = 1;
  }

  getParticipationsByStudentId(): void {
    this.service.getAllParticipationsByStudentId(this.user.id).subscribe({
      next: (result: Participation[]) => {
        this.participations = result;
      },
    });
  }

  getLoggedUser(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user.role === 'student') this.getParticipationsByStudentId();
    });
  }

  selectTab(tab: string) {
    this.currentPage = 1; // Reset page to 1 when tab is selected
    this.updatePagedEvents();
  }

  updatePagedEvents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEvents = this.eventsForDisplay
      .slice(startIndex, endIndex)
      .sort(
        (a, b) =>
          new Date(b.datePublication).getTime() -
          new Date(a.datePublication).getTime()
      );

    this.totalPages = Math.ceil(this.eventsForDisplay.length / this.pageSize);
    this.isLoading = false;
    
    window.scrollTo(0, 0);

    this.showEmptySeachPlaceholder = false;
    if((this.searchName != "" || this.selectedCheckboxes.length + this.selectDate + this.selectPrice > 0) && this.pagedEvents.length == 0){
      this.showEmptySeachPlaceholder = true;
    }
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

  createEvent() {
    this.router.navigate(['create-event']);
  }

  changeActiveTab(tab: string) {
    this.searchControl.setValue('');
    this.searchName = '';
    this.router.navigate(['/events-page'], { queryParams: { activeTab: tab } });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;

    if (tab == 'allEvents') {
      this.service.getAllEvents(this.authService.user$.value).subscribe({
        next: (result: PagedResults<MyEvent>) => {
          this.events = result.results;

          this.searchEventsByName(this.searchName);
        },
      });
    } else if (tab == 'yourEvents' && this.user.role == 'author') {
      this.service.getYoursEvents(this.user.id).subscribe({
        next: (result: MyEvent[]) => {
          this.events = result;

          this.searchEventsByName(this.searchName);
        },
      });
    } else if (tab == 'yourInterests' && this.user.role == 'student') {
      this.service.getYoursParticipateEvents(this.user.id).subscribe({
        next: (result: MyEvent[]) => {
          this.events = result;

          this.searchEventsByName(this.searchName);
        },
      });
    }else{
      this.activeTab = 'allEvents'
      const queryParams = this.createQueryParams();

      this.router.navigate(['/events-page'], { queryParams });
    }
  }

  searchEventsByName(name: string | null) {
    this.service.getEventsBySearchName(this.events, name, this.user).subscribe({
      next: (result: MyEvent[]) => {
        this.eventsForDisplay = result;

        if (this.selectedCheckboxes.length != 0)
          this.filterByEventTypes(this.eventsForDisplay);
        else if (this.selectedDateFilter != '')
          this.filterByEventDates(this.eventsForDisplay);
        else if (this.selectedPriceFilter != '')
          this.filterByEventPrice(this.eventsForDisplay);
        else this.updatePagedEvents();
      },
    });
  }

  searchEvent(name: string) {
    this.searchName = name;
    const queryParams = this.createQueryParams();

    this.router.navigate(['/events-page'], { queryParams });
  }

  clearSearchName() {
    this.searchControl.setValue('');
    this.searchName = '';
    const queryParams = this.createQueryParams();

    this.router.navigate(['/events-page'], { queryParams });
  }

  onCheckboxChange() {
    this.selectedCheckboxes = this.getCheckedCheckboxes();
    const queryParams = this.createQueryParams();

    this.router.navigate(['/events-page'], { queryParams });
  }

  filterByEventTypes(eventsForFiltering: MyEvent[]) {

    this.service
      .getEventsByFiltersTypes(
        eventsForFiltering,
        this.selectedCheckboxes,
        this.user
      )
      .subscribe({
        next: (result: MyEvent[]) => {
          this.eventsForDisplay = result;
          if (this.selectedDateFilter != '')
            this.filterByEventDates(this.eventsForDisplay);
          else if (this.selectedPriceFilter != '')
            this.filterByEventPrice(this.eventsForDisplay);
          else {
            this.updatePagedEvents();
          }
        },
      });
  }

  getCheckedCheckboxes(): string[] {
    const checkedValues: string[] = [];
    if (this.screenWidth! > 450){
      const checkboxes = document.querySelectorAll('.left-bar .event-checkbox:checked');
      checkboxes.forEach((checkbox: any) => {
        checkedValues.push(checkbox.value);
      });
    }else if(this.screenWidth! <= 450){
      const checkboxes = document.querySelectorAll('.dropdown-contentt .event-checkbox:checked');
      checkboxes.forEach((checkbox: any) => {
        checkedValues.push(checkbox.value);
      });
    }
    return checkedValues;
  }

  clearTypeFilter(type: string) {
    const index = this.selectedCheckboxes.indexOf(type);
    if (index !== -1) {
      this.selectedCheckboxes.splice(index, 1);

      setTimeout(() => {
        const queryParams = this.createQueryParams();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/events-page'], { queryParams });
      }, 100);
    }
  }

  clearAllFilters() {
    this.selectedCheckboxes = [];
    this.selectedDateFilter = '';

    this.startDate = null;
    this.endDate = null;
    this.selectedPriceFilter = '';
    const queryParams = this.createQueryParams();

    this.router.navigate(['/events-page'], { queryParams });
  }

  filterByEventDates(eventsForFiltering: MyEvent[]) {
    this.service
      .getEventsByFiltersDates(
        eventsForFiltering,
        this.selectedDateFilter,
        this.user,
        this.startDate,
        this.endDate
      )
      .subscribe({
        next: (result: MyEvent[]) => {
          this.eventsForDisplay = result;

          if (this.selectedPriceFilter != '')
            this.filterByEventPrice(this.eventsForDisplay);
          else this.updatePagedEvents();
        },
      });
  }

  onDateFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDateFilter = inputElement.value;

    if (this.selectedDateFilter != 'pickdate') {
      const queryParams = this.createQueryParams();

      this.router.navigate(['/events-page'], { queryParams });
    }
  }

  onStartDateChange(date: Date | null): void {
    this.startDate = null;
    this.endDate = null;
    this.startDate = date;
    this.checkAndSetDates();
  }

  onEndDateChange(date: Date | null): void {
    this.endDate = date;
    this.checkAndSetDates();
  }

  private formatDateToISO(date: Date | null): string | null {
    return date ? date.toISOString() : null;
  }

  private checkAndSetDates(): void {
    if (this.startDate && this.endDate) {
      const queryParams = this.createQueryParams();

      this.router.navigate(['/events-page'], { queryParams });
    }
  }

  clearDateFilter() {
    this.selectedDateFilter = '';
    this.startDate = null;
    this.endDate = null;
    const queryParams = this.createQueryParams();
    this.router.navigate(['/events-page'], { queryParams });
  }

  onPriceFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedPriceFilter = inputElement.value;

    const queryParams = this.createQueryParams();
    this.router.navigate(['/events-page'], { queryParams });
  }

  clearPriceFilter() {
    this.selectedPriceFilter = '';
    const queryParams = this.createQueryParams();
    this.router.navigate(['/events-page'], { queryParams });
  }

  filterByEventPrice(eventsForFiltering: MyEvent[]) {
    this.service
      .getEventsByFiltersPrice(
        eventsForFiltering,
        this.selectedPriceFilter,
        this.user
      )
      .subscribe({
        next: (result: MyEvent[]) => {
          this.eventsForDisplay = result;
          this.updatePagedEvents();
        },
      });
  }

  private createQueryParams(): any {
    const params: any = {};

    if (this.searchName) {
      params['searchName'] = this.searchName;
    }
    if (this.selectedCheckboxes.length > 0) {
      params['filterTypes'] = this.selectedCheckboxes;
    }
    if (
      this.selectedDateFilter != '' &&
      this.selectedDateFilter != 'pickdate'
    ) {
      params['filterDates'] = this.selectedDateFilter;
    }
    if (
      this.selectedDateFilter == 'pickdate' &&
      this.startDate != null &&
      this.endDate != null
    ) {
      params['filterDates'] = 'pickdate';

      params['startDate'] =
        typeof this.startDate === 'string'
          ? this.startDate
          : this.formatDateToISO(this.startDate);
      params['endDate'] =
        typeof this.endDate === 'string'
          ? this.endDate
          : this.formatDateToISO(this.endDate);
    }
    if (this.selectedPriceFilter != '') {
      params['filterPrice'] = this.selectedPriceFilter;
    }
    if (this.activeTab) {
      params['activeTab'] = this.activeTab;
    }

    return params;
  }

  onMenuToggle(index: number | null) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
