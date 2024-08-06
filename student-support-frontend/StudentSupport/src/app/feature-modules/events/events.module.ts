import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPageComponent } from './events-page/events-page.component';
import { LayoutModule } from '../layout/layout.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { YourEventsComponent } from './your-events/your-events.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SingleEventPageComponent } from './single-event-page/single-event-page.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    EventsPageComponent,
    YourEventsComponent,
    SingleEventPageComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CalendarModule,
    FormsModule,
    SharedModule,
    MatExpansionModule,
  ],
  exports: [EventsPageComponent],
})
export class EventsModule {}
