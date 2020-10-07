import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import { NoAuthLayoutComponent} from './layouts/no-auth-layout/no-auth-layout.component';
import { RootPageComponent} from './pages/root-page/root-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './guards/auth.guard';
import { PatientComponent } from './pages/patient/patient.component';
import { NewPatientComponent } from './pages/new-patient/new-patient.component';
import { PatientDiseaseComponent } from './components/patient-disease/patient-disease.component';
import { HistoryComponent } from './pages/history/history.component';


const routes: Routes = [{
  path: '',
  component: AuthLayoutComponent,
  canActivate: [ AuthGuard ],
  canActivateChild: [AuthGuard],
  children: [
    {
      path: '',
      redirectTo: 'root',
      pathMatch: 'full'
    },
    {
      path: 'root',
      component: RootPageComponent
    },
    {
      path: 'patient',
      component: PatientComponent
    },
    {
      path: 'new-patient',
      component: NewPatientComponent
    },
    {
      path: 'patient-disease',
      component: PatientDiseaseComponent
    },
    {
      path: 'patient-history',
      component: HistoryComponent
    }
  ]
},
{
  path: '',
  component: NoAuthLayoutComponent,
  children : [
    {
      path: 'login',
      component: LoginPageComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
