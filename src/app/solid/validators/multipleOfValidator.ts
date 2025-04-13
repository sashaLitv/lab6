import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isMultipleOf(value: number, multiple: number): boolean {
  return value !== null && value % multiple === 0;
}

export function multipleOfValidator(multiple: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!isMultipleOf(value, multiple)) {
      return { multipleOf: { value: control.value } };
    }

    return null;
  };
}