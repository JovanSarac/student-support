import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, MyProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    IonicModule,
    FormsModule,
    PickerModule,
    SharedModule,
  ],
  exports: [NavbarComponent, HomeComponent],
})
export class LayoutModule {}
