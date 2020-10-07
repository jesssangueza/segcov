import { TestBed } from '@angular/core/testing';

import { DiseaseTypeService } from './disease-type.service';

describe('DeseaseTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiseaseTypeService = TestBed.get(DiseaseTypeService);
    expect(service).toBeTruthy();
  });
});
