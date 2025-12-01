import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { MOCK_REPORT_DETAILS, ReportDetails } from '../models/report-details.model';

@Injectable({
  providedIn: 'root'
})
export class ReportDetailsApiService {

  constructor() { }

  getReportDetails(reportId: string): Observable<ReportDetails | null> {
    const selectedReport = MOCK_REPORT_DETAILS.find(report => report.id === reportId) ?? null;

    return of(selectedReport).pipe(
      delay(2000)
    );
  }
}
