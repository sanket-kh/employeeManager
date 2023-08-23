import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UpdateEmployeeComponent} from './update-employee/update-employee.component';
import {ErrorComponent} from './error/error.component';
import {InterceptorInterceptor} from "./service/interceptor.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:InterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
