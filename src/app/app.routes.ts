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
                path: 'login',
                loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
            }

        ]
    }
];
