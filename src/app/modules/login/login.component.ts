import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  loading = false;
  error = false;
  

  form = this.fb.group({
    email: ['', emailValidator()],
    password: ['', Validators.required],
  });

  sendForm() {
    if (this.form.valid) {
      this.error = false;
      this.loading = true;

      try {
        const responseOk = this.authService.login(
          this.form.value.email!,
          this.form.value.password!
        );

        this.router.navigate(['/']);
      } catch (error) {
        console.log(error);
        this.error = true;
      } finally {
        this.loading = false;
      }


    } else {
      console.log('El formulario tiene errores. Por favor, revísalo antes de enviar.');
      this.form.markAllAsTouched();
    }
  }
}
