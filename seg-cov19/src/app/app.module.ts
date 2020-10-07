import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NoAuthLayoutComponent } from './layouts/no-auth-layout/no-auth-layout.component';
import { RootPageComponent } from './pages/root-page/root-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TopbarComponent } from './layouts/topbar/topbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { PatientComponent } from './pages/patient/patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { NewPatientComponent } from './pages/new-patient/new-patient.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PatientDiseaseComponent } from './components/patient-disease/patient-disease.component';
import { HistoryComponent } from './pages/history/history.component';
import { EditHistoryComponent } from './components/edit-history/edit-history.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    NoAuthLayoutComponent,
    RootPageComponent,
    LoginPageComponent,
    TopbarComponent,
    SidebarComponent,
    PatientComponent,
    EditPatientComponent,
    NewPatientComponent,
    PaginationComponent,
    PatientDiseaseComponent,
    HistoryComponent,
    EditHistoryComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AngularFirestore], // *************** Important add this for firebase.
  bootstrap: [AppComponent]
})
export class AppModule { }

