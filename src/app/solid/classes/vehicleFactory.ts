import { Vehicle } from "./vehicle";
import { Bicycle } from "./bicycle";
import { Motorbike } from "./motorbike";
import { PassengerCar } from "./passengerCar";
import { Truck } from "./truck";
import { vehicleType } from "./vehicleName";

export class VehicleFactory {   
    public static create(data: any): Vehicle{
        switch (data.type) {
            case vehicleType[0]:
                return new Motorbike(
                    data.id, 
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null, 
                    data.abs);
            case vehicleType[1]:
                return new PassengerCar(
                    data.id,
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null,
                    data.passengerSeats);
            case vehicleType[2]:
                return new Truck(
                    data.id, 
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null,
                    data.cargoCapacity);
            case vehicleType[3]:
                return new Bicycle(
                    data.id,
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null,
                    data.brakeType);
            default:
                throw new Error("Invalid vehicle type!");
        }
    }
}