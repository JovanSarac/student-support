import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbar, MatToolbarModule,} from '@angular/material/toolbar';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
  ],
  exports: [
    MatToolbar,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    MatTable,
    MatIconButton,
    MatIcon,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
  ]
})
export class MaterialModule { }
