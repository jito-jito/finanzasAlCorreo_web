import { TestBed } from '@angular/core/testing';

import { ReportDetailsApiService } from './report-details-api.service';

describe('ReportDetailsApiService', () => {
  let service: ReportDetailsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDetailsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
