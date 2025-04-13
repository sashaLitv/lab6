import { VehicleFactory } from "./vehicleFactory";
import { Motorbike } from "./motorbike";
import { PassengerCar } from "./passengerCar";
import { Truck } from "./truck";
import { Bicycle } from "./bicycle";

describe("VehicleFactory class tests", () => {

    fit("should create a Motorbike", () => {
        const vehicle = VehicleFactory.create({
            type: "Motorbike",
            id: 1,
            rentalPrice: 15,
            available: true,
            abs: true
        });

        expect(vehicle).toBeInstanceOf(Motorbike);
        expect(vehicle.getID()).toBe(1);
        expect(vehicle.getRentalPrice()).toBe(15);
        expect(vehicle.isAvailable()).toBe(true);
        expect((vehicle as Motorbike).getAbs()).toBe(true);
    });

    fit("should create a PassengerCar", () => {
        const vehicle = VehicleFactory.create({
            type: "Passenger Car",
            id: 2,
            rentalPrice: 20,
            available: false,
            passengerSeats: 4
        });

        expect(vehicle).toBeInstanceOf(PassengerCar);
        expect(vehicle.getID()).toBe(2);
        expect(vehicle.getRentalPrice()).toBe(20);
        expect(vehicle.isAvailable()).toBe(false);
        expect((vehicle as PassengerCar).getMaxSeats()).toBe(4);
    });

    fit("should create a Truck", () => {
        const vehicle = VehicleFactory.create({
            type: "Truck",
            id: 3,
            rentalPrice: 80,
            available: true,
            cargoCapacity: 5000
        });

        expect(vehicle).toBeInstanceOf(Truck);
        expect(vehicle.getID()).toBe(3);
        expect(vehicle.getRentalPrice()).toBe(80);
        expect(vehicle.isAvailable()).toBe(true);
        expect((vehicle as Truck).getMaxCargoCapacity()).toBe(5000);
    });

    fit("should create a Bicycle", () => {
        const vehicle = VehicleFactory.create({
            type: "Bicycle",
            id: 4,
            rentalPrice: 10,
            available: true,
            brakeType: "disc"
        });

        expect(vehicle).toBeInstanceOf(Bicycle);
        expect(vehicle.getID()).toBe(4);
        expect(vehicle.getRentalPrice()).toBe(10);
        expect(vehicle.isAvailable()).toBe(true);
        expect((vehicle as Bicycle).getBrakeType()).toBe("disc");
    });

    fit("should throw an error for an invalid vehicle type", () => {
        expect(() => VehicleFactory.create({
            type: "Bus",
            id: 5,
            rentalPrice: 300,
            available: true,
            passengerSeats: 60
        })).toThrowError("Invalid vehicle type!");
    });

});