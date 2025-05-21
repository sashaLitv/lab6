import { Injectable } from '@angular/core';
import { Vehicle } from '../classes/vehicle';
import { VehicleFactory } from '../classes/vehicleFactory';
import { VehicleType } from '../classes/vehicleName';
import { ConfigService } from './config.service';
import { Database, ref, set, push, update, remove, onValue} from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
    public copyVehicles: Vehicle[] = [];
    public searchVehicles: Vehicle[] = [];
    private vehicleSubject = new BehaviorSubject<Vehicle[]>([]);
    vehicles$ = this.vehicleSubject.asObservable();

    private typeSub: any;
    private availabilitySub: any;

    constructor(private configService: ConfigService, private db: Database) {
        this.typeSub = this.configService.types$.subscribe((types) => {
            this.search(types, this.configService.availability$.value);
        });
        
        this.availabilitySub = this.configService.availability$.subscribe((availability) => {
            this.search(this.configService.types$.value, availability);
        });
    }

    addVehicle(vehicle: Vehicle) {
        const vehiclesRef = ref(this.db, 'vehicles');
        const newVehicleRef = push(vehiclesRef);

        set(newVehicleRef, {
            ...vehicle,
            id: newVehicleRef.key,
            type: vehicle.getType()
        });
    }
    removeVehicle(vehicleId: string): void {
       const vehicleRef = ref(this.db, `vehicles/${vehicleId}`)
       remove(vehicleRef);
    }
    editVehicle(updatedVehicle: Vehicle): void {
        console.log(updatedVehicle);
        const vehicleRef = ref(this.db, `vehicles/${updatedVehicle.getID()}`);
        update(vehicleRef, updatedVehicle);
    }

    search(types: VehicleType[], availability: boolean | null) {
        this.searchVehicles = this.copyVehicles.filter((vehicle) => {
            const typeMatch = types.length === 0 || types.includes(vehicle.getType());
            const availabilityMatch = availability === null || vehicle.isAvailable() === availability;
            return typeMatch && availabilityMatch;
        });
    }

    fetchVehicles() : void {
        const vehiclesRef = ref(this.db, 'vehicles');
        console.log(vehiclesRef);

        onValue(vehiclesRef, (snapshot) =>{
            const data = snapshot.val();

            const vehicles = data
                ?
                    Object.entries(data).map(([key, value]: [string, any]) =>
                        VehicleFactory.create({...value, id: key})
                    )
                : [];
            this.vehicleSubject.next(vehicles)
            this.search(this.configService.types$.value, this.configService.availability$.value);
        });
    }
}