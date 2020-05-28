import { TestBed, inject } from '@angular/core/testing';

import { StepsService } from './steps-service.service';

describe('StepsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepsService]
    });
  });

  it('should be created', inject([StepsService], (service: StepsService) => {
    expect(service).toBeTruthy();
  }));
});
