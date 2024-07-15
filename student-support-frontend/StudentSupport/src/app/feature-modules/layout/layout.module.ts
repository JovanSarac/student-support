import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    NavbarComponent,
    TopbarComponent,
    HomeComponent
  ]
})
export class LayoutModule { }
