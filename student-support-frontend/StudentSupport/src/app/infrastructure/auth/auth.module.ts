import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { AdminPanelComponent } from './administrator/admin-panel/admin-panel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsComponent } from './administrator/reports/reports.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AdminPanelComponent,
    ReportsComponent,
    CheckEmailComponent,
    EmailVerificationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
