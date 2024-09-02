import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { MarkdownModule } from 'ngx-markdown';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    MyProfileComponent,
    FooterComponent,
    EditProfileDialogComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    IonicModule,
    FormsModule,
    PickerModule,
    SharedModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
  ],
  exports: [NavbarComponent, HomeComponent, FooterComponent],
})
export class LayoutModule {}
