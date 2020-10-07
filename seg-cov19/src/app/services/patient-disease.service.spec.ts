import { TestBed } from '@angular/core/testing';

import { PatientDiseaseService } from './patient-disease.service';

describe('PatientDiseaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientDiseaseService = TestBed.get(PatientDiseaseService);
    expect(service).toBeTruthy();
  });
});
