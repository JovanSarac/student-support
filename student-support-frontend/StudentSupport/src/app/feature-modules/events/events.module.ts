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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';

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
    MaterialModule,

  ],
  exports: [EventsPageComponent],
})
export class EventsModule {}
