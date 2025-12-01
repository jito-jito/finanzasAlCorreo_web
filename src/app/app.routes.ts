import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'sobre-la-app',
                loadComponent: () => import('./modules/about/about.component').then(m => m.AboutComponent)
            },
            {
                path: 'analisis',
                loadComponent: () => import('./modules/analysis/analysis.component').then(m => m.AnalysisComponent)
            },
            {
                path: 'login',
                loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'registro',
                loadComponent: () => import('./modules/register/register.component').then(m => m.RegisterComponent)
            },
            {
                path: 'reporte/:reportId',
                loadComponent: () => import('./modules/report-details/report-details.component').then(m => m.ReportDetailsComponent)
            }
        ]
    }
];
