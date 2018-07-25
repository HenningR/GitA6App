import { TestBed, inject } from '@angular/core/testing';

import { ClientnotificationService } from './clientnotification.service';

describe('ClientnotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientnotificationService]
    });
  });

  it('should be created', inject([ClientnotificationService], (service: ClientnotificationService) => {
    expect(service).toBeTruthy();
  }));
});
