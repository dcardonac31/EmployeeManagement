import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeReportComponent } from './employee/employee-report/employee-report.component';
import { IsAdminGuard } from './is-admin.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';


const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'employee/report', component: EmployeeReportComponent, canActivate: [IsAdminGuard]}, 
  {path:'employee/create', component: EmployeeCreateComponent, canActivate: [IsAdminGuard]}, 
  {path:'employee/edit/:id', component: EmployeeEditComponent, canActivate: [IsAdminGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
