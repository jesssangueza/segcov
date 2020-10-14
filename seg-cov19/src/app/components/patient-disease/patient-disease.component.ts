import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiseaseTypeService } from 'src/app/services/disease-type.service';
import { SimpleParameter } from 'src/app/models/simple-parameter';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { PatientDisease } from 'src/app/models/patient-disease';
import { PatientDiseaseService } from 'src/app/services/patient-disease.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-disease',
  templateUrl: './patient-disease.component.html',
  styleUrls: ['./patient-disease.component.css']
})
export class PatientDiseaseComponent implements OnInit, OnDestroy {
  public DiseaseTypes: SimpleParameter [];
  public Patient: Patient;
  private PatientId: string;
  public selectedDiseases: number [];
  public diseaseForm: FormGroup;
  public PatientDisease: PatientDisease;
  public successMessage: string;
  private subscriptions = new Subscription();
  private editedPatientDiseaseId: string;

  constructor(private diseaseTypeService: DiseaseTypeService,
              private router: Router,
              private route: ActivatedRoute,
              private patientService: PatientService,
              private patientDiseaseService: PatientDiseaseService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
    this.diseaseForm = this.formBuilder.group({
      Treatment: [''],
      OtherDisease: [''],
      Diseases: this.formBuilder.array([])
    });

    this.getDiseaseTypes();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getDiseaseTypes() {
    this.diseaseTypeService.getDiseaseTypes().subscribe((result) => {
      this.DiseaseTypes = [];

      result.forEach((p: any) => {
        this.DiseaseTypes.push(this.diseaseTypeService.MaptoSimpleParameter(p.data()));
        this.diseasesFormArray.push(new FormControl(false));
      });

      // Getting parameter from snapshot returns the initial value of the route.
      // Search the Patient and the Patient Disease
      this.PatientId = this.route.snapshot.paramMap.get('patientId');
      this.subscriptions.add(
        this.patientService.getPatient(this.PatientId).subscribe((resultPatient) => {
          this.Patient = this.patientService.MaptoPatient(resultPatient.payload.id, resultPatient.payload.data());
          this.getPatientDisease();
        })
      );

      /*// Search the Patient and the Patient Disease.
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.PatientId = params.get('patientId');
        this.subscriptions.add(
          this.patientService.getPatient(this.PatientId).subscribe((resultPatient) => {
            this.Patient = this.patientService.MaptoPatient(resultPatient.payload.id, resultPatient.payload.data());
            this.getPatientDisease();
          })
        );
      });*/
    });
  }

  get diseasesFormArray() {
    return this.diseaseForm.get('Diseases') as FormArray;
  }

  private getPatientDisease() {
    this.subscriptions.add(
      this.patientDiseaseService.getPatientDisease(this.Patient).subscribe((result) => {
        if (result.size <= 0) {
          this.PatientDisease = { Treatment: '', Diseases : [] } as PatientDisease;
        }
        else {
          this.PatientDisease = this.patientDiseaseService.MaptoPatientDisease(result.docs[0].id, result.docs[0].data());
          this.editedPatientDiseaseId = this.PatientDisease.Id;
        }

        this.diseaseForm.patchValue(this.PatientDisease);

        // Loop over form array controls and check if that index apperas as selected to mask as checked or not.
        for (let i = 0; i < this.diseasesFormArray.controls.length; i++) {
          const position =  this.PatientDisease.Diseases.indexOf(i + 1);
          if ( position !== -1) {
            this.diseasesFormArray.controls[i].setValue(true);
          }
          else {
            this.diseasesFormArray.controls[i].setValue(false);
          }
        }
      })
    );
  }

  saveDiseases() {
    this.PatientDisease = this.diseaseForm.value;
    if (this.editedPatientDiseaseId) {
      this.PatientDisease.Id = this.editedPatientDiseaseId;
    }

    this.PatientDisease.Diseases = [];

    // Loop over form array values checking if it is selected and in the same position retrieve its key.
    for (let index in this.diseaseForm.get('Diseases').value) {
      if (this.diseaseForm.get('Diseases').value[index]) {
        this.PatientDisease.Diseases.push(this.DiseaseTypes[index].Key);
      }
    }

    this.patientDiseaseService.savePatientDisease(this.PatientDisease, this.Patient.Id);
    this.toastr.success("Guardado Correctamente");
    this.router.navigate(['/patient-disease', { patientId: this.Patient.Id}], );
  }
}
