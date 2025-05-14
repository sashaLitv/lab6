import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { vehicleCombinations, VehicleType, vehicleType } from "../classes/vehicleName";

@Injectable({
    providedIn: 'root',
})

export class ConfigService {
    types$: BehaviorSubject<VehicleType[]> = new BehaviorSubject<VehicleType[]>(DEFAULT_TYPES);
    availability$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(DEFAULT_AVAILABILITY);

    setType(currentCombinationIndex: number) {
        this.types$.next(vehicleCombinations[currentCombinationIndex]);
    }

    setAvailability(available: boolean) {
        this.availability$.next(available);
    }
}

const DEFAULT_AVAILABILITY = true;
const DEFAULT_TYPES = vehicleCombinations[0]