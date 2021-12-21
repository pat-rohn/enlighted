import { TestBed } from '@angular/core/testing';

import { LedcontrolService } from './ledcontrol.service';

describe('LedcontrolService', () => {
  let service: LedcontrolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedcontrolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
