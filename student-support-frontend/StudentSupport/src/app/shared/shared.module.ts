import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SecondaryButtonComponent } from './components/secondary-button/secondary-button.component';

@NgModule({
  declarations: [
    MapComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MapComponent, PrimaryButtonComponent, SecondaryButtonComponent],
})
export class SharedModule {}
