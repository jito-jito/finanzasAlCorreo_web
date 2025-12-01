import { Component, inject } from '@angular/core';
import { DailyReport } from './models/home.model';
import { HomeApiService } from './services/home-api.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent {
  router = inject(Router)
  homeApiService = inject(HomeApiService);
  data!: DailyReport;
  loading: boolean = true;
  error: boolean = false;

  authService = inject(AuthService);

  ngOnInit(): void {
    
    this.homeApiService.getDailyReport(new Date()).subscribe({
      next: (report) => {
        this.data = report;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  openReportDetails(reportId: string): void {
    this.router.navigate(['/reporte', reportId]);
  }
}
