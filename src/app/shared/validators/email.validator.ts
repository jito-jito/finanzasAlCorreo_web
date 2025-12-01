import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const EMAIL_RULES = {
    REGEX_EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
}

export function isValidEmail(email: string | null): boolean {
    if(email === null) return false;

    return EMAIL_RULES.REGEX_EMAIL.test(email);
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = isValidEmail(control.value);
    
    return isValid ? null : { invalidEmail: true };
  }
}
