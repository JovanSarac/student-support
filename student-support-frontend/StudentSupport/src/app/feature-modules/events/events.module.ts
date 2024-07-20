import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPageComponent } from './events-page/events-page.component';
import { LayoutModule } from '../layout/layout.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { YourEventsComponent } from './your-events/your-events.component';



@NgModule({
  declarations: [
    EventsPageComponent,
    YourEventsComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CalendarModule,
    FormsModule,
  ],
  exports:[
    EventsPageComponent
  ]
})
export class EventsModule { }
