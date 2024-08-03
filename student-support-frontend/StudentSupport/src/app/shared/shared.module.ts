import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapComponent, PrimaryButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [MapComponent, PrimaryButtonComponent],
})
export class SharedModule {}
