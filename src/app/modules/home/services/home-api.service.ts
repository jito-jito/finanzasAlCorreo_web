import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { DailyReport, MOCK_DAILY_REPORT } from '../models/home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeApiService {

  constructor() { }

  getDailyReport(date: Date): Observable<DailyReport> {
    return of(MOCK_DAILY_REPORT).pipe(
      delay(2000)
    )
  }
}
