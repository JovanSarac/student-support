import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationBoardComponent } from './information-board/information-board.component';
import { LayoutModule } from '../layout/layout.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [
    InformationBoardComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    CalendarModule,
    SharedModule,
    FormsModule,
    PickerModule,
  ],
  exports:[
    InformationBoardComponent
  ]
})
export class BoardModule { }
