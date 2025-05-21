import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { vehicleType } from "../solid/classes/vehicleName";
import { multipleOfValidator } from "../solid/validators/multipleOfValidator";

export function formConstructor(
    type: string,
    vehicleForm: FormGroup,
    fb: FormBuilder
){
    const controlsToRemove = [
        'Abs',
        'passengerSeats',
        'cargoCapacity',
        'brakeType'
    ]

    controlsToRemove.forEach(control => {
        if (vehicleForm.contains(control)) {
            vehicleForm.removeControl(control);
        }
    });

    switch(type){
        case vehicleType[0]:
            vehicleForm.addControl('Abs', fb.control('', [
                Validators.required
            ]));
            break;
    
        case vehicleType[1]:
            vehicleForm.addControl('passengerSeats', fb.control('', [
                Validators.required, 
                Validators.min(1),
                Validators.max(8), 
                Validators.pattern('^[0-9]+$')
            ]));
            break;
        
        case vehicleType[2]:
            vehicleForm.addControl('cargoCapacity', fb.control('', [
                Validators.required, 
                Validators.min(100),
                Validators.max(100000),
                Validators.pattern('^[0-9]+$'),
                multipleOfValidator(100)
            ]));
            break;
        
        case vehicleType[3]:
            vehicleForm.addControl('brakeType', fb.control('', [
                Validators.required,
                Validators.pattern('^(Disc|Rim|Drum|Coaster)$')
            ]));
            break;

        default:
            console.error('New Type?:', type);
            break;  
    }
}