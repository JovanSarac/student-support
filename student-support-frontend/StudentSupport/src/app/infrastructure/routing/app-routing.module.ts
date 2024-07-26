import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { InformationBoardComponent } from 'src/app/feature-modules/board/information-board/information-board.component';
import { CreateEventComponent } from 'src/app/feature-modules/board/create-event/create-event.component';
import { EventsPageComponent } from 'src/app/feature-modules/events/events-page/events-page.component';
import { YourEventsComponent } from 'src/app/feature-modules/events/your-events/your-events.component';
import { SingleEventPageComponent } from 'src/app/feature-modules/events/single-event-page/single-event-page.component';
import { MyProfileComponent } from 'src/app/feature-modules/layout/my-profile/my-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'info-board',
    component: InformationBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events-page',
    component: EventsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'your-events',
    component: YourEventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-event',
    component: CreateEventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'single-event/:eventId',
    component: SingleEventPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
