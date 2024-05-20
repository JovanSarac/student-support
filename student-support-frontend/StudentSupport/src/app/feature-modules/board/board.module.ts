import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationBoardComponent } from './information-board/information-board.component';
import { LayoutModule } from '../layout/layout.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InformationBoardComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
  ],
  exports:[
    InformationBoardComponent
  ]
})
export class BoardModule { }
