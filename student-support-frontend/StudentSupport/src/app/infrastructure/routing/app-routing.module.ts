import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { CreateEventComponent } from 'src/app/feature-modules/board/create-event/create-event.component';
import { EventsPageComponent } from 'src/app/feature-modules/events/events-page/events-page.component';
import { SingleEventPageComponent } from 'src/app/feature-modules/events/single-event-page/single-event-page.component';
import { MyProfileComponent } from 'src/app/feature-modules/layout/my-profile/my-profile.component';
import { AdminPanelComponent } from '../auth/administrator/admin-panel/admin-panel.component';
import { ReportsComponent } from '../auth/administrator/reports/reports.component';
import { CreateClubComponent } from 'src/app/feature-modules/clubs/create-club/create-club.component';
import { SingleClubPageComponent } from 'src/app/feature-modules/clubs/single-club-page/single-club-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'events-page',
    component: EventsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-event',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-event/:eventId',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'single-event/:eventId',
    component: SingleEventPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-profile/:userId',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'clubs-page',
  //   component: EventsPageComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'create-club',
    component: CreateClubComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-club/:clubId',
    component: CreateClubComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'single-club/:clubId',
    component: SingleClubPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
