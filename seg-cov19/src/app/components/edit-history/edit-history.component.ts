import { Component, OnInit, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { HistoryService } from 'src/app/services/history.service';
import { History} from 'src/app/models/history';
import { Router } from '@angular/router';
import { SimpleParameter } from 'src/app/models/simple-parameter';
import { CovidSymptomsService } from 'src/app/services/covid-symptoms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.css']
})
export class EditHistoryComponent implements OnInit, OnChanges {

  historyForm: FormGroup;
  history: History;
  isNew: boolean;
  CovidSymptoms: SimpleParameter[];
  
  @Input() patientId: string;
  @Input() editedHistoryId: string;
  @Output() cancelClick = new EventEmitter();
  @Output() saveClick = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private historyService: HistoryService,
              private router: Router,
              private covidSymptomsService: CovidSymptomsService,
              private toastr: ToastrService) { }

  ngOnInit() {
    const now = new Date();
    this.historyForm = this.formBuilder.group({
      AbcgoalCalification: ['1', Validators.required],
      Treatment: [''],
      Evolution: [''],
      OtherTests: [''],
      Created: [this.formatDate(now)],
      Symptoms: this.formBuilder.array([])
    });

    this.getCovidSymptoms();
  }

  get symptomsFormArray() {
    return this.historyForm.get('Symptoms') as FormArray;
  }

  saveHistory() {
    this.history = this.historyForm.value;
    if (this.editedHistoryId !== '0') {
      this.history.Id = this.editedHistoryId;
    }

    this.history.Symptoms = [];
    // Loop over form array values checking if it is selected and in the same position retrieve its key.
    for (let index in this.historyForm.get('Symptoms').value) {
      if (this.historyForm.get('Symptoms').value[index]) {
        this.history.Symptoms.push(this.CovidSymptoms[index].Key);
      }
    }

    this.historyService.saveHistory(this.patientId, this.history);
    this.toastr.success("Guardado Correctamente");
    this.saveClick.emit();
  }

  cancel() {
    this.cancelClick.emit();
  }

  getHistory(historyId) {
    this.editedHistoryId = historyId;
    this.historyService.getHistory(this.editedHistoryId).subscribe((result) => {
      this.history = this.historyService.MaptoHistory(result.payload.id, result.payload.data());

      if (this.historyForm) {
        this.historyForm.patchValue(this.history);

        // Loop over form array controls and check if that index apperas as selected to mask as checked or not.
        for (let i = 0; i < this.symptomsFormArray.controls.length; i++) {
          const position =  this.history.Symptoms.indexOf(i + 1);
          if ( position !== -1) {
            this.symptomsFormArray.controls[i].setValue(true);
          }
          else {
            this.symptomsFormArray.controls[i].setValue(false);
          }
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let prop in changes) {
      if (prop === 'editedHistoryId') {
        this.editedHistoryId = changes[prop].currentValue;
      }
    }
  }

  getCovidSymptoms() {
    this.covidSymptomsService.getCovidSymptoms().subscribe((result) => {
      this.CovidSymptoms = [];

      result.forEach((p: any) => {
        this.CovidSymptoms.push(this.covidSymptomsService.MaptoSimpleParameter(p.data()));
        this.symptomsFormArray.push(new FormControl(false));
        if (this.editedHistoryId !== '0') {
          this.getHistory(this.editedHistoryId);
        }
      });
    });
  }

  formatDate(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }


    return [year, month, day].join('-');
  }
}
