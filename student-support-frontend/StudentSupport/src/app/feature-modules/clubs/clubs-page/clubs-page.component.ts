import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ClubsService } from '../clubs.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'src/app/shared/model/club.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'app-clubs-page',
  templateUrl: './clubs-page.component.html',
  styleUrl: './clubs-page.component.css',
})
export class ClubsPageComponent implements OnInit {
  user!: User;
  searchControl = new FormControl('');
  activeTab: string = 'allClubs';
  searchName: string | null = '';
  clubs: Club[] = [];
  clubsForDisplay: Club[] = [];

  currentPage = 1;
  pageSize = 20;
  pagedClubs: Club[] = [];
  totalPages = 1;
  menuVisibleIndex: number | null = null;
  selectedCheckboxes: string[] = [];

  categoryClub: { [key: string]: string } = {
    Sports: 'Sportski',
    Artistic: 'Umetnički',
    Scientific: 'Naučni',
    Cultural: 'Kulturni i književni',
    Technical: 'Tehnički i inovacioni',
    Gaming: 'Gejmerski',
    Social: 'Društveni i humanitarni',
    Other: 'Ostali',
  };

  constructor(
    private service: ClubsService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user$.value;
    this.route.queryParams.subscribe((params) => {
      this.handleQueryParamsChange(params);
    });
  }

  handleQueryParamsChange(params: any) {
    if (params['activeTab'] != undefined) {
      this.setActiveTab(params['activeTab']);
    } else {
      this.router.navigate(['/clubs-page'], {
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
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;

    if (tab == 'allClubs') {
      this.service.getAllClubs(this.authService.user$.value).subscribe({
        next: (result: PagedResults<Club>) => {
          this.clubs = result.results;

          this.totalPages = Math.ceil(this.clubs.length / this.pageSize);

          this.searchClubsByName(this.searchName)
        },
      });
    } else if (tab == 'yourClubs') {
      this.service
        .getClubsByAuthorId(this.authService.user$.value.id)
        .subscribe({
          next: (result: PagedResults<Club>) => {
            this.clubs = result.results;

            this.totalPages = Math.ceil(this.clubs.length / this.pageSize);

            this.searchClubsByName(this.searchName)
          },
        });
    } else if (tab == 'yourMemberships') {
      this.service.getAllJoinedClubs(this.authService.user$.value).subscribe({
        next: (result: PagedResults<Club>) => {
          this.clubs = result.results;

          this.totalPages = Math.ceil(this.clubs.length / this.pageSize);

          this.searchClubsByName(this.searchName)
        },
      });
    }
  }

  searchClubsByName(name: string | null){
    this.service.getClubssBySearchName(this.clubs, name, this.user).subscribe({
      next: (result: Club[])=>{
        this.clubsForDisplay = result;

        if (this.selectedCheckboxes.length != 0)
          this.filterByCategoriesClub(this.clubsForDisplay);
        else{
          this.updatePagedEvents();
          this.updateCheckboxes();
        }
 
      }
    })
  }

  clearSearchName(){
    this.searchControl.setValue('');
    this.searchName = '';
    const queryParams = this.createQueryParams();

    this.router.navigate(['/clubs-page'], { queryParams});
  }


  searchClubs(name: string) {
    this.searchName = name;
    const queryParams = this.createQueryParams();

    this.router.navigate(['/clubs-page'], { queryParams });
  }


  onCheckboxChange() {
    this.selectedCheckboxes = this.getCheckedCheckboxes();
    const queryParams = this.createQueryParams();

    this.router.navigate(['/clubs-page'], { queryParams });
  }

  filterByCategoriesClub(clubsForFiltering: Club[]) {
    this.updateCheckboxes();
    this.service
      .getClubsByCategories(
        clubsForFiltering,
        this.selectedCheckboxes,
        this.user
      )
      .subscribe({
        next: (result: Club[]) => {
          this.clubsForDisplay = result;
          this.updatePagedEvents();
        },
      });
  }

  clearTypeFilter(type: string) {
    const index = this.selectedCheckboxes.indexOf(type);
    if (index !== -1) {
      this.selectedCheckboxes.splice(index, 1);
      this.updateCheckboxes();

      setTimeout(() => {
        const queryParams = this.createQueryParams();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/clubs-page'], { queryParams });
      }, 100);
    }
  }

  clearAllFilters() {
    this.selectedCheckboxes = [];
    const queryParams = this.createQueryParams();

    this.router.navigate(['/clubs-page'], { queryParams });
  }


  getCheckedCheckboxes(): string[] {
    const checkedValues: string[] = [];
    const checkboxes = document.querySelectorAll('.club-checkbox:checked');

    checkboxes.forEach((checkbox: any) => {
      checkedValues.push(checkbox.value);
    });

    return checkedValues;
  }

  updateCheckboxes() {
    const checkboxes = document.querySelectorAll('.club-checkbox');

    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = this.selectedCheckboxes.includes(checkbox.value);
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

    if (this.activeTab) {
      params['activeTab'] = this.activeTab;
    }

    return params;
  }

  changeActiveTab(tab: string) {
    this.searchControl.setValue('');
    this.searchName = '';
    this.router.navigate(['/clubs-page'], { queryParams: { activeTab: tab } });
  }

  createClub() {
    this.router.navigate(['create-club']);
  }

  onMenuToggle(index: number | null) {
    this.menuVisibleIndex = this.menuVisibleIndex === index ? null : index;
  }

  selectTab(tab: string) {
    this.currentPage = 1; // Reset page to 1 when tab is selected
    this.updatePagedEvents();
  }

  updatePagedEvents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedClubs = this.clubsForDisplay.slice(startIndex, endIndex);
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
}
