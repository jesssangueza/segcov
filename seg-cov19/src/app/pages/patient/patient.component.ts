import { Component, OnInit, OnDestroy } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';
import { database } from 'firebase';
import { Pagination } from 'src/app/models/pagination';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, OnDestroy {
  public patients: Patient[];
  public selectedPatient: Patient;
  public pagination: Pagination;
  public showSearch: boolean;
  public searchForm: FormGroup;
  private subscriptions = new Subscription();

  constructor(private patientService: PatientService, private formBuilder: FormBuilder, private router: Router) {
    this.showSearch = false;
    this.patients = [];
   }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      MiddleName: [''],
    });


    this.resetPagination();
    this.getPatients();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  selectPatient(patient) {
    this.selectedPatient = patient;
  }

  // This is little bit tricky because of firebase pagination.
  getPatients() {
    this.patientService.getCountPatients().then(result => {
      this.pagination.CollectionSize = result.size;
    });

    if (this.pagination.Page === 1 || !this.pagination.PreviosPage || this.pagination.PreviosPage < this.pagination.Page) {
      this.subscriptions.add(
        this.patientService.getNextPaginatedPatients(this.pagination).subscribe((result) => {
        this.patients = [];
        this.pagination.FirstVisible = result[0].payload.doc;
        this.pagination.LastVisible = result[result.length - 1].payload.doc;

        result.forEach((p: any) => {
          this.patients.push(this.patientService.MaptoPatient(p.payload.doc.id, p.payload.doc.data()));
        });

        this.selectedPatient = this.patients[0];
        })
      );
    }
    else {
      this.subscriptions.add(
        this.patientService.getPrevPaginatedPatients(this.pagination).subscribe((result) => {
          this.patients = [];
          this.pagination.FirstVisible = result[0].payload.doc;
          this.pagination.LastVisible = result[result.length - 1].payload.doc;

          result.forEach((p: any) => {
            this.patients.push(this.patientService.MaptoPatient(p.payload.doc.id, p.payload.doc.data()));
          });

          this.selectedPatient = this.patients[0];
        })
      );
    }
  }

  onPageChanged() {
    this.getPatients();
    this.pagination.PreviosPage = this.pagination.Page;
  }

  resetPagination() {
    if (this.pagination) {
      this.pagination.Page = 1;
      this.pagination.Offset = 0;
    } else {
      this.pagination = <Pagination> { Page: 1, PageSize: 5, Offset : 0 };
    }
  }

  displaySearch() {
    this.showSearch = !this.showSearch;
  }

  searchPatient() {
    this.patientService.searchPatient(this.searchForm.get('MiddleName').value).subscribe((result) => {
      this.patients = [];

      result.forEach((p: any) => {
        this.patients.push(this.patientService.MaptoPatient(p.payload.doc.id, p.payload.doc.data()));
      });

      this.selectedPatient = this.patients[0];
    });
  }

  diseaseClick(patient: Patient) {
    this.router.navigate(['/patient-disease', { patientId: patient.Id}], );
  }

  historyClick(patient: Patient) {
    this.router.navigate(['/patient-history', { patientId: patient.Id}], );
  }
}
