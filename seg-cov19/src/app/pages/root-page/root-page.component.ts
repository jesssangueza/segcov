import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.css']
})
export class RootPageComponent implements OnInit {

  public Totals: any;
  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.Totals = {
      TotalPatients: 0
    };

    this.getTotals();
  }

  getTotals() {
    this.patientService.getCountPatients().then(result => {
      this.Totals.TotalPatients = result.size;
    });
  }
}
