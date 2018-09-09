import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaskModule } from '@fagnerlima/ng-mask';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpanTrabalhadorDirective } from './shared/span-trabalhador.directive';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ReportsComponent } from './pages/reports/reports.component';
import { SocioListComponent } from './pages/socio/socio-list/socio-list.component';
import { SocioFormComponent } from './pages/socio/socio-form/socio-form.component';
import { SocioEditComponent } from './pages/socio/socio-edit/socio-edit.component';
import { SocioViewComponent } from './pages/socio/socio-view/socio-view.component';


@NgModule({
  declarations: [
    AppComponent,
    CompareValidatorDirective,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SpanTrabalhadorDirective,
    ReportsComponent,
    SocioListComponent,
    SocioFormComponent,
    SocioEditComponent,
    SocioViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule,
    NgHttpLoaderModule,
    SweetAlert2Module.forRoot(),
    NgMaskModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
