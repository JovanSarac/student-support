import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { InputComponent } from './components/input/input.component';
import { MarkdownEditorComponent } from './components/markdown-editor/markdown-editor.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MarkdownModule } from 'ngx-markdown';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ClubCardComponent } from './components/club-card/club-card.component';


@NgModule({
  declarations: [
    MapComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    EventCardComponent,
    InputComponent,
    MarkdownEditorComponent,
    ClubCardComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MaterialModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MarkdownModule,
    PickerModule
  ],
  exports: [
    MapComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    EventCardComponent,
    InputComponent,
    MarkdownEditorComponent,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    ClubCardComponent
  ],
})
export class SharedModule {}
