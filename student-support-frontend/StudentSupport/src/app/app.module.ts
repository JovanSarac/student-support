import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './infrastructure/material/material.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from './infrastructure/auth/jwt/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardModule } from './feature-modules/board/board.module';
import { IonicModule } from '@ionic/angular';
import { EventsModule } from './feature-modules/events/events.module';
import { CalendarModule } from 'primeng/calendar';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ToastrModule } from 'ngx-toastr';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({ declarations: [
        AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        LayoutModule,
        BoardModule,
        EventsModule,
        BrowserAnimationsModule,
        MaterialModule,
        AuthModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        CalendarModule,
        FormsModule,
        PickerModule,
        MatDialogModule,
        NgxDaterangepickerMd.forRoot(),
        ToastrModule.forRoot({
            timeOut: 4000,
            extendedTimeOut: 1000,
            maxOpened: 3,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            progressAnimation: 'increasing'
        })], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {
}

