import { AbstractControl, ValidatorFn} from '@angular/forms';
import { DateValidatorService } from '../services/dateValidator.service';
export function dateValidator(): ValidatorFn {
    return(control: AbstractControl): { [key: string]: any } | null => {
        let validator = new DateValidatorService();
        let valid = !control.value || validator.validateDate(control.value);
        return valid ? null : { date: true }
    };

}