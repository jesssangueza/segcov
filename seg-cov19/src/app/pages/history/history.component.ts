import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { History, HistoryViewModel} from 'src/app/models/history';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CovidSymptomsService } from 'src/app/services/covid-symptoms.service';
import { SimpleParameter } from 'src/app/models/simple-parameter';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit , OnDestroy{

  public Patient: Patient;
  private PatientId: string;
  private subscriptions = new Subscription();
  public PatientHistory: HistoryViewModel[];
  public CovidSymptoms: SimpleParameter[];
  public AddEditHistory: boolean;
  public editedHistoryId: string;

  constructor(private historyService: HistoryService,
              private patientService: PatientService,
              private route: ActivatedRoute,
              private covidSymptomsService: CovidSymptomsService) {
    this.AddEditHistory = false;
    this.editedHistoryId = '0';
   }

  ngOnInit() {
    this.PatientHistory = [];
    this.checkRouteParameters();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  collapse(history: HistoryViewModel) {
    history.Collapse = !history.Collapse;
  }

  

  getHistory() {
    this.subscriptions.add(
      this.historyService.getHistoryByPatient(this.PatientId).subscribe((result) => {
        this.PatientHistory = [];
        result.forEach((p: any) => {
          let history = this.historyService.MaptoHistory(p.payload.doc.id, p.payload.doc.data());

          for (let i = 0; i < this.CovidSymptoms.length; i++) {
            const sp: SimpleParameter = this.CovidSymptoms[i];
            const position = history.Symptoms.indexOf(sp.Key);
            if (position !== -1) {
              history.DescriptiveSymptoms.push(sp.Value);
            }
          }
          this.PatientHistory.push(history);
        });
      })
    );
  }

  getCovidSymptoms() {
    this.covidSymptomsService.getCovidSymptoms().subscribe((result) => {
      this.CovidSymptoms = [];

      result.forEach((p: any) => {
        this.CovidSymptoms.push(this.covidSymptomsService.MaptoSimpleParameter(p.data()));
      });

      this.getHistory();
    });
  }

  checkRouteParameters() {
    // Getting parameter from snapshot returns the initial value of the route.
    this.PatientId = this.route.snapshot.paramMap.get('patientId');
    this.subscriptions.add(
      this.patientService.getPatient(this.PatientId).subscribe((resultPatient) => {
        this.Patient = this.patientService.MaptoPatient(resultPatient.payload.id, resultPatient.payload.data());
      })
    );
    this.getCovidSymptoms();

    /*// Getting parameter using observable. *********************
      // in case the  ngOnInit() is not called again "the same component instance is used" needing to get parameter from observable.
      // test to be sure if ngOnInit is called or not to use snapshot or observable paths
      this.route.paramMap.subscribe((params: ParamMap) => {
      this.PatientId = params.get('patientId');
      this.subscriptions.add(
        this.patientService.getPatient(this.PatientId).subscribe((resultPatient) => {
          this.Patient = this.patientService.MaptoPatient(resultPatient.payload.id, resultPatient.payload.data());
        })
      );
      this.getCovidSymptoms();
    });*/
  }

  addNewHistory() {
    this.AddEditHistory = !this.AddEditHistory;
    this.editedHistoryId = '0';
  }

  onCancelClick() {
    this.AddEditHistory = false;
  }

  editHistory(history: HistoryViewModel) {
    this.AddEditHistory = true;
    this.editedHistoryId = history.Id;
  }

  onSaveClick() {
    this.AddEditHistory = false;
    this.getHistory();
  }
}
