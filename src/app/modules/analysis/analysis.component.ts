import { Component, inject } from '@angular/core';
import { AnalysisApiService } from './services/analysis-api.service';
import { AnalysisData } from './models/analysis.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  imports: [],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
  standalone: true,
})
export class AnalysisComponent {
  analysisApiService = inject(AnalysisApiService);
  router = inject(Router);
  data!: AnalysisData;
  loading: boolean = true;
  error: boolean = false;


  ngOnInit(): void {
    this.analysisApiService.getAnalysisData().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
      }
    });
  }


  goToAnalysisDetails(analysisId: string): void {
    this.router.navigate(['/reporte', analysisId]);
  }
}
