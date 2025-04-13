import { Injectable } from '@angular/core';
import { Vehicle } from '../classes/vehicle';
import { VehicleFactory } from '../classes/vehicleFactory';

const API_URL = 'https://api.jsonbin.io/v3/b/67e2c7b78960c979a5781898';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
    public vehicles: Vehicle[] = [];

    constructor() {}

    addVehicle(vehicle: Vehicle) {
        this.vehicles.push(vehicle);
    }
    removeVehicle(vehicle: Vehicle) {
        const index = this.vehicles.findIndex(v => v.getID() === vehicle.getID());
        if(index !== -1){
            this.vehicles.splice(index, 1);
        }
    }

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
        });
       
    }
}