import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiseaseComponent } from './patient-disease.component';

describe('PatientDiseaseComponent', () => {
  let component: PatientDiseaseComponent;
  let fixture: ComponentFixture<PatientDiseaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDiseaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
