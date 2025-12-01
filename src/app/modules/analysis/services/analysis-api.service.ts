import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { AnalysisData, DEFAULT_ANALYSIS_DATA } from '../models/analysis.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisApiService {

  constructor() { }

  getAnalysisData(): Observable<AnalysisData> {
    return of(DEFAULT_ANALYSIS_DATA).pipe(
      delay(1000)
    );
  }
}
