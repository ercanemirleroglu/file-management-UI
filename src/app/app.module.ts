import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FileUploadModule} from "primeng/fileupload";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TableModule} from "primeng/table";
import { RouterModule, Routes } from '@angular/router';
import {ResponseInterceptor} from "../service/app.response.interceptor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    HttpClientModule,
    BrowserModule,
    FileUploadModule,
    TableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
