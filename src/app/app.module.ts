import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { SharedService } from './services/shared.service';
import { RouteGuardService } from './services/route-guard.service';
import { HttpService } from './services/http.service';
import { MessageModalComponent } from './message-modal/message-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    StepOneComponent,
    StepTwoComponent,
    MessageModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: StepOneComponent, pathMatch: 'full' },
      { path: 'step-one', component: StepOneComponent },
      { path: 'step-two', component: StepTwoComponent, canActivate: [RouteGuardService] },
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

