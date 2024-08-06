import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPageComponent } from './events-page/events-page.component';
import { LayoutModule } from '../layout/layout.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SingleEventPageComponent } from './single-event-page/single-event-page.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    EventsPageComponent,
    SingleEventPageComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CalendarModule,
    FormsModule,
    SharedModule,
    NgxDaterangepickerMd.forRoot(),
    ReactiveFormsModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  exports: [EventsPageComponent],
})
export class EventsModule {}
