import { Injectable } from '@angular/core';
import { Vehicle } from '../classes/vehicle';
import { VehicleFactory } from '../classes/vehicleFactory';
import { VehicleType } from '../classes/vehicleName';
import { ConfigService } from './config.service';

const API_URL = 'https://api.jsonbin.io/v3/b/67e2c7b78960c979a5781898';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
    public vehicles: Vehicle[] = [];

    constructor(private configService: ConfigService) {}

    //lab7
    addVehicle(vehicle: Vehicle) {
        this.vehicles.push(vehicle);
    }
    removeVehicle(vehicle: Vehicle) {
        const index = this.vehicles.findIndex(v => v.getID() === vehicle.getID());
        if(index !== -1){
            this.vehicles.splice(index, 1);
        }

        this.search(this.configService.types$.value, this.configService.availability$.value);
    }

    //lab8
    searchVehicles: Vehicle[] = [];
    search(types: VehicleType[], availability: boolean | null) {
        this.searchVehicles = this.vehicles.filter((vehicle) => {
            const typeMatch = types.length === 0 || types.includes(vehicle.getType());
            const availabilityMatch = availability === null || vehicle.isAvailable() === availability;
            return typeMatch && availabilityMatch;
        });
    }

    typeSub = this.configService.types$.subscribe((types) => {
        this.search(types, this.configService.availability$.value);
    });
    
    availabilitySub = this.configService.availability$.subscribe((availability) => {
        this.search(this.configService.types$.value, availability);
    });

    public async load() {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
         }).then((res) => res.json())
        .then((json) =>  {
            let data;
            data = json;
            data = data.record;
                
            let vehicles = data.map((item: any) => VehicleFactory.create(item));
            vehicles.forEach((vehicle: any) => this.addVehicle(vehicle));

            this.search(this.configService.types$.value, this.configService.availability$.value);
        });
       
    }
}