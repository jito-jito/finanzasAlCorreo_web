import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PASSWORD_RULES = {
    REGEX_PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
}

export function isValidPassword(password: string | null): boolean {
    if(password === null) return false;

    return PASSWORD_RULES.REGEX_PASSWORD.test(password);
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = isValidPassword(control.value);
    
    return isValid ? null : { invalidPassword: true };
  }
}