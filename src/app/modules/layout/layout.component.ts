import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

/**
 * @description
 * Componente de layout principal de la aplicación.
 * Proporciona la estructura básica de la aplicación, incluyendo el encabezado,
 * la navegación y el área de contenido donde se renderizan las vistas hijas.
 */


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  currentDate!: string
  authService = inject(AuthService);

  constructor(private router: Router) {}

  ngOnInit() {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    this.currentDate = new Date().toLocaleDateString('es-ES', options);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
