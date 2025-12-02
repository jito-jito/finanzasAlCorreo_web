import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({
      fullName: '',
      alias: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: ''
    });
  });

  it('should initialize loading as false', () => {
    expect(component.loading).toBe(false);
  });

  describe('Form Validations', () => {
    it('should be invalid when empty', () => {
      expect(component.form.valid).toBe(false);
    });

    it('should validate fullName minimum length of 6 characters', () => {
      const fullNameControl = component.form.get('fullName');

      fullNameControl?.setValue('John');
      expect(fullNameControl?.hasError('minlength')).toBe(true);

      fullNameControl?.setValue('John D');
      expect(fullNameControl?.hasError('minlength')).toBe(false);
    });

    it('should validate alias minimum length of 3 characters', () => {
      const aliasControl = component.form.get('alias');

      aliasControl?.setValue('ab');
      expect(aliasControl?.hasError('minlength')).toBe(true);

      aliasControl?.setValue('abc');
      expect(aliasControl?.hasError('minlength')).toBe(false);
    });

    it('should validate email format using custom validator', () => {
      const emailControl = component.form.get('email');

      emailControl?.setValue('invalid-email');
      expect(emailControl?.invalid).toBe(true);

      emailControl?.setValue('valid@example.com');
      expect(emailControl?.valid).toBe(true);
    });

    it('should validate emails match', () => {
      component.form.patchValue({
        email: 'test@example.com',
        confirmEmail: 'different@example.com'
      });
      expect(component.form.hasError('emailsDoNotMatch')).toBe(true);

      component.form.patchValue({
        confirmEmail: 'test@example.com'
      });
      expect(component.form.hasError('emailsDoNotMatch')).toBe(false);
    });

    it('should validate password format using custom validator', () => {
      const passwordControl = component.form.get('password');
      console.log('Password Control:')
      console.log(passwordControl);
      passwordControl?.setValue('weak');

      console.log('Password Control value:')
      console.log(passwordControl?.invalid);
      expect(passwordControl?.invalid).toBe(true);

      passwordControl?.setValue('StrongPass123');
      console.log('Password Control error:')
      console.log(passwordControl?.errors);
      expect(passwordControl?.hasError('invalidPassword')).toBe(false);
    });

    it('should validate passwords match', () => {
      component.form.patchValue({
        password: 'Password123!',
        confirmPassword: 'DifferentPass123!'
      });
      expect(component.form.hasError('passwordsDoNotMatch')).toBe(true);

      component.form.patchValue({
        confirmPassword: 'Password123!'
      });
      expect(component.form.hasError('passwordsDoNotMatch')).toBe(false);
    });

    it('should be valid when all fields are correctly filled', () => {
      component.form.patchValue({
        fullName: 'John Doe',
        alias: 'johndoe',
        email: 'john@example.com',
        confirmEmail: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123'
      });

      expect(component.form.valid).toBe(true);
    });
  });

  describe('sendForm method', () => {
    it('should not submit when form is invalid', () => {
      spyOn(console, 'log');

      component.sendForm();

      expect(console.log).toHaveBeenCalledWith('El formulario tiene errores. Por favor, revísalo antes de enviar.');
      expect(component.form.touched).toBe(true);
      expect(mockAuthService.register).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when form is invalid', () => {
      component.sendForm();

      expect(component.form.get('fullName')?.touched).toBe(true);
      expect(component.form.get('alias')?.touched).toBe(true);
      expect(component.form.get('email')?.touched).toBe(true);
      expect(component.form.get('confirmEmail')?.touched).toBe(true);
      expect(component.form.get('password')?.touched).toBe(true);
      expect(component.form.get('confirmPassword')?.touched).toBe(true);
    });

    it('should set loading to false after successful registration', () => {
      mockAuthService.register.and.returnValue(true);

      component.form.patchValue({
        fullName: 'John Doe',
        alias: 'johndoe',
        email: 'john@example.com',
        confirmEmail: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123'
      });

      component.sendForm();

      expect(component.loading).toBe(false);
    });

    it('should not navigate when registration fails', () => {
      spyOn(window, 'alert');
      mockAuthService.register.and.returnValue(false);

      component.form.patchValue({
        fullName: 'John Doe',
        alias: 'johndoe',
        email: 'john@example.com',
        confirmEmail: 'john@example.com',
        password: 'Password123',
        confirmPassword: 'Password123'
      });

      component.sendForm();

      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });
});