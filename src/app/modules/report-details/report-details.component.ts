import { Component, inject } from '@angular/core';
import { ReportDetails } from './models/report-details.model';
import { ReportDetailsApiService } from './services/report-details-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-details',
  imports: [],
  templateUrl: './report-details.component.html',
  styleUrl: './report-details.component.scss',
  standalone: true,
})
export class ReportDetailsComponent {
  reportDetailsApiService = inject(ReportDetailsApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  data!: ReportDetails | null;
  loading: boolean = true;
  error: boolean = false;

  ngOnInit() {
    const reportId = this.route.snapshot.paramMap.get('reportId') ?? '';

    this.reportDetailsApiService.getReportDetails(reportId).subscribe({
      next: (response) => {
        this.data = response;
        this.loading = false;
        console.log('Report details loaded:', this.data);
      },
      error: (err) => {
        console.error('Error fetching report details:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
