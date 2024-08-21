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
  searchName: string | null = "";
  clubs : Club[] = [];

  currentPage = 1;
  pageSize = 20;
  pagedClubs: Club[] = [];
  totalPages = 1;

  constructor(
    private service : ClubsService,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
    this.user = this.authService.user$.value;
    this.route.queryParams.subscribe(params => {
      this.handleQueryParamsChange(params);
    });
  }

  handleQueryParamsChange(params: any) {
    if(params['activeTab'] != undefined){
      this.setActiveTab(params['activeTab']);
    }
    else{
      this.router.navigate(['/events-page'], { queryParams: { activeTab: this.activeTab } });
    }
    this.searchName = params['searchName'] || "";
    if(this.searchName != "")
      this.searchControl.setValue(this.searchName);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;

    if(tab == "allClubs"){
      this.service.getAllClubs(this.authService.user$.value).subscribe({
        next: (result: PagedResults<Club>) => {
          this.clubs = result.results;

          this.totalPages = Math.ceil(this.clubs.length / this.pageSize);
          this.updatePagedEvents()
          
        },
      });
    }
  }

  searchClubs(name: string){
    this.searchName = name;
    const queryParams = this.createQueryParams();

    this.router.navigate(['/clubs-page'], { queryParams });
    
  }

  private createQueryParams(): any {
    const params: any = {};
  
    if (this.searchName) {
      params['searchName'] = this.searchName;
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

  createClub(){
    this.router.navigate(['create-club']);

  }

  selectTab(tab: string) {
    this.currentPage = 1; // Reset page to 1 when tab is selected
    this.updatePagedEvents();
  }

  updatePagedEvents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedClubs = this.clubs.slice(startIndex, endIndex);
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
