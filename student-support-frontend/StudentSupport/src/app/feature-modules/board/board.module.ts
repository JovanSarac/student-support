import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationBoardComponent } from './information-board/information-board.component';



@NgModule({
  declarations: [
    InformationBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    InformationBoardComponent
  ]
})
export class BoardModule { }
