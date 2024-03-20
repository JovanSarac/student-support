import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationBoardComponent } from './information-board/information-board.component';
import { LayoutModule } from '../layout/layout.module';



@NgModule({
  declarations: [
    InformationBoardComponent
  ],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports:[
    InformationBoardComponent
  ]
})
export class BoardModule { }
