import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClubComponent } from './create-club/create-club.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { CalendarModule } from 'primeng/calendar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SingleClubPageComponent } from './single-club-page/single-club-page.component';
import { ClubsPageComponent } from './clubs-page/clubs-page.component';
import { ClubMembersDialogComponent } from './club-members-dialog/club-members-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ClubEventsViewComponent } from './club-events-view/club-events-view.component';
import { AnnouncementsViewComponent } from './announcements-view/announcements-view.component';
import { MarkdownModule } from 'ngx-markdown';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';

@NgModule({
  declarations: [
    CreateClubComponent,
    SingleClubPageComponent,
    ClubsPageComponent,
    ClubMembersDialogComponent,
    ClubEventsViewComponent,
    AnnouncementsViewComponent,
    CreateAnnouncementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LayoutModule,
    MaterialModule,
    CalendarModule,
    ReactiveFormsModule,
    PickerModule,
    MatTooltipModule,
    MatTabsModule,
    MarkdownModule,
  ],
})
export class ClubsModule {}
