import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPageComponent } from './events-page/events-page.component';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
    EventsPageComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
  ],
  exports:[
    EventsPageComponent
  ]
})
export class EventsModule { }
