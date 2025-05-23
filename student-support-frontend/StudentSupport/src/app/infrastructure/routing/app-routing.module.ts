import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { CreateEventComponent } from 'src/app/feature-modules/events/create-event/create-event.component';
import { EventsPageComponent } from 'src/app/feature-modules/events/events-page/events-page.component';
import { SingleEventPageComponent } from 'src/app/feature-modules/events/single-event-page/single-event-page.component';
import { MyProfileComponent } from 'src/app/feature-modules/layout/my-profile/my-profile.component';
import { AdminPanelComponent } from '../auth/administrator/admin-panel/admin-panel.component';
import { ReportsComponent } from '../auth/administrator/reports/reports.component';
import { CreateClubComponent } from 'src/app/feature-modules/clubs/create-club/create-club.component';
import { SingleClubPageComponent } from 'src/app/feature-modules/clubs/single-club-page/single-club-page.component';
import { ClubsPageComponent } from 'src/app/feature-modules/clubs/clubs-page/clubs-page.component';
import { EmailVerificationComponent } from '../auth/email-verification/email-verification.component';
import { CheckEmailComponent } from '../auth/check-email/check-email.component';
import { AboutUsComponent } from 'src/app/feature-modules/layout/about-us/about-us.component';
import { ContactUsComponent } from 'src/app/feature-modules/layout/contact-us/contact-us.component';

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
    data: {
      role: ['author'],
    },
  },
  {
    path: 'edit-event/:eventId',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['author'],
    },
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
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['administrator'],
    },
  },
  {
    path: 'clubs-page',
    component: ClubsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-club',
    component: CreateClubComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['author'],
    },
  },
  {
    path: 'edit-club/:clubId',
    component: CreateClubComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['author'],
    },
  },
  {
    path: 'single-club/:clubId',
    component: SingleClubPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-event-byclub/:clubId',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['student', 'author'],
    },
  },
  {
    path: 'edit-event-byclub/:eventId',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['student', 'author'],
    },
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'verify-email',
    component: EmailVerificationComponent,
  },
  {
    path: 'check-email',
    component: CheckEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
