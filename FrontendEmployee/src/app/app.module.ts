import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeReportComponent } from './employee/employee-report/employee-report.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { AuthorizedComponent } from './security/authorized/authorized.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { AuthenticationFormComponent } from './security/authentication-form/authentication-form.component';
import { ErrorsShowComponent } from './utilities/errors-show/errors-show.component';
import { SecurityInterceptorService } from './security/security-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeReportComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    MenuComponent,
    LandingPageComponent,
    EmployeeFormComponent,
    GenericListComponent,
    AuthorizedComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationFormComponent,
    ErrorsShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
