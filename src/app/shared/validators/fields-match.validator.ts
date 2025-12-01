import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function doFieldsMatchValidator(input1: string, input2: string, errorKey: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const input1Value = formGroup.get(input1)?.value;
    const input2Value = formGroup.get(input2)?.value;

    const isValid = input1Value === input2Value;

    return isValid ? null : { [errorKey]: true };
  }
}