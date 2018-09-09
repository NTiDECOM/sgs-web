import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';
import { ReportsComponent } from './pages/reports/reports.component';
import { SocioListComponent } from './pages/socio/socio-list/socio-list.component';
import { SocioFormComponent } from './pages/socio/socio-form/socio-form.component';
import { SocioViewComponent } from './pages/socio/socio-view/socio-view.component';
import { SocioEditComponent } from './pages/socio/socio-edit/socio-edit.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'relatorio', component: ReportsComponent},
  {path: 'socios', component: SocioListComponent},
  {path: 'socios/:id/view', component: SocioViewComponent},
  {path: 'socios/add', component: SocioFormComponent},
  {path: 'socios/:id/edit', component: SocioEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
