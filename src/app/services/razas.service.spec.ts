import { TestBed, inject } from '@angular/core/testing';

import { RazasService } from './razas.service';

describe('RazasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RazasService]
    });
  });

  it('should be created', inject([RazasService], (service: RazasService) => {
    expect(service).toBeTruthy();
  }));
});
