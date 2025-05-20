import { PassengerCar } from "./passengerCar";
import { vehicleType } from "./vehicleName";

describe('PassengerCar class tests', () => {
    let passengerCar: PassengerCar;

    beforeEach(() => {
        passengerCar = new PassengerCar('103', 15, true, null, 4);
    });
    
    fit('should create', () => {
        expect(passengerCar).toBeTruthy();
    });

    fit('should return correct number of seats', () => {
        expect(passengerCar.getMaxSeats()).toBe(4); 
    });

    fit('should decrease available seats when someone sits down', () => {
        expect(passengerCar.sit()).toBe('A person has sat down. There are 3 seats left.');
        expect(passengerCar.getAvailableSeats()).toBe(3); 
    });

    fit('should not allow to sit if no available seats', () => {
        passengerCar.sit();
        passengerCar.sit();
        passengerCar.sit();
        passengerCar.sit();
        
        expect(passengerCar.sit()).toBe('No available seats left!'); 
        expect(passengerCar.getAvailableSeats()).toBe(0); 
    });

    fit('should get correct car type', () => {
        expect(passengerCar.getType()).toBe(vehicleType[1]); 
    });

    fit('should get correct car details', () => {
        const details = passengerCar.getDetails();
        expect(details).toContain('Passenger Seats: 4'); 
    });

    fit('should drift correctly', () => {
        expect(passengerCar.drift()).toBe('WoW, the passenger car (103) also can drift!');
    });

    fit('should move correctly', () => {
        expect(passengerCar.move()).toBe('The passenger car (103) is moving.');
    });

    fit('should stop correctly', () => {
        expect(passengerCar.stop()).toBe('The passenger car (103) has stopped.');
    });

});