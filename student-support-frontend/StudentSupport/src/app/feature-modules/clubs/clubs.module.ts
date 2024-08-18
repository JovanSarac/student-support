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

@NgModule({
  declarations: [CreateClubComponent],
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
  ],
})
export class ClubsModule {}
