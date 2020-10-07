import { TestBed } from '@angular/core/testing';

import { CovidSymptomsService } from './covid-symptoms.service';

describe('CovidSymptomsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CovidSymptomsService = TestBed.get(CovidSymptomsService);
    expect(service).toBeTruthy();
  });
});
