import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../shared/validators/email.validator';
import { passwordValidator } from '../../shared/validators/password.validator';
import { doFieldsMatchValidator } from '../../shared/validators/fields-match.validator';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  loading = false;

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(6)]],
    alias: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [emailValidator(), Validators.required]],
    confirmEmail: ['', Validators.required],
    password: ['', [passwordValidator(), Validators.required]],
    confirmPassword: ['', Validators.required],
  }, {
    validators: [
      doFieldsMatchValidator('email', 'confirmEmail', 'emailsDoNotMatch'),
      doFieldsMatchValidator('password', 'confirmPassword', 'passwordsDoNotMatch'),
    ]
  });

  sendForm() {
      if (this.form.valid) {
      this.loading = true;

      const responseOk = this.authService.register(
        this.form.value.fullName!,
        this.form.value.alias!,
        this.form.value.password!,
        this.form.value.email!
      );

      if(!responseOk) {
        this.loading = false;
        alert('Error al registrar el usuario. Inténtalo nuevamente más tarde.');
        return;
      }

      this.router.navigate(['/']);
      this.loading = false;
    } else {
      console.log('El formulario tiene errores. Por favor, revísalo antes de enviar.');
      this.form.markAllAsTouched();
    }
  }
}
