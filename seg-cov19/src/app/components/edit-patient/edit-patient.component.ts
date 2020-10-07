import { Component, OnInit, Input, DoCheck, KeyValueDiffers, OnChanges, SimpleChanges } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit, OnChanges {
  patientForm: FormGroup;
  patient: Patient;
  isNew: boolean;
  @Input() editedPatientId: string;
  
  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private router: Router,
              private toastr: ToastrService) { }

  save() {
    this.patient = this.patientForm.value;
    if(!this.editedPatientId) {
      this.isNew = true;
    }else {
      this.patient.Id = this.editedPatientId;
    }

    this.patientService.save(this.patient);
    this.toastr.success("Guardado Correctamente");
    if (this.isNew) {
      this.router.navigate(['/patient']);
    }
  }

  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      LastName: [''],
      Age: [''],
      Telephone: [''],
      Sex: [''],
      Type: ['A']
    });

    // In case is called to edit a patient.
    if (this.patient != null) {
      this.patientForm.patchValue(this.patient);
    }
  }

  getPatient(patientId) {
    this.editedPatientId = patientId;
    this.patientService.getPatient(this.editedPatientId).subscribe((result) => {
      this.patient = this.patientService.MaptoPatient(result.payload.id, result.payload.data());

      if (this.patientForm) {
        this.patientForm.patchValue(this.patient);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let prop in changes) {
      if (prop === 'editedPatientId') {
        this.getPatient(changes[prop].currentValue);
      }
    }
  }
}
