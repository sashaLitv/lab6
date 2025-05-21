import { Vehicle } from "./vehicle";
import { Motorbike } from "./motorbike/motorbike";
import { PassengerCar } from "./passengerCar/passengerCar";
import { Truck } from "./truck/truck";
import { Bicycle } from "./bicycle/bicycle";
import { vehicleType } from "./vehicleName";
import { GenericVehicle } from "./genericType/genericVehicle";

export class VehicleFactory {   
    public static create(data: any): Vehicle{
        switch (data.type) {
            case vehicleType[0]:
                return new Motorbike(
                    data.id, 
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null, 
                    data.Abs
                );
            case vehicleType[1]:
                return new PassengerCar(
                    data.id,
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null,
                    data.passengerSeats
                );
            case vehicleType[2]:
                return new Truck(
                    data.id, 
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null,
                    data.cargoCapacity
                );
            case vehicleType[3]:
                return new Bicycle(
                    data.id,
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null,
                    data.brakeType
                );
            default:
                return new GenericVehicle(
                    data.id,
                    data.rentalPrice, 
                    data.available, 
                    data.lastRentDay ? new Date(data.lastRentDay) : null,
                    data.type
                );
        }
    }
}