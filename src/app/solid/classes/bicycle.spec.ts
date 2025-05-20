import { Bicycle } from "./bicycle";
import { vehicleType } from "./vehicleName";

describe('Bicycle class tests', () => {
    let bicycle: Bicycle;

    beforeEach(() => {
        bicycle = new Bicycle('101', 5, true, null, 'disc');
    });

    fit('should create', () => {
        expect(bicycle).toBeTruthy();
    });

    fit('should get correct brake type', () => {
        expect(bicycle.getBrakeType()).toBe('disc');
    });

    fit('should remove chain correctly', () => {
        expect(bicycle.removeChain()).toBe('The chain has been removed from the bicycle.');
        expect(bicycle.removeChain()).toBe('The chain is already off.'); 
    });
    
    fit('should reinstall chain correctly', () => {
        bicycle.removeChain(); 
        expect(bicycle.reinstallChain()).toBe('The chain has been reinstalled on the bicycle.');
        expect(bicycle.reinstallChain()).toBe('The chain is already on the bicycle!'); 
    });

    fit('should get type correctly', () => {
        expect(bicycle.getType()).toBe(vehicleType[3]);
    });

    fit('should get details correctly', () => {
        const details = bicycle.getDetails();
        expect(details).toContain('Brake Type: disc');
    });

    fit('should perform wheelie correctly', () => {
        expect(bicycle.doWheelie()).toBe('The bicycle is doing a wheelie!');
    });

    fit('should ride correctly', () => {
        expect(bicycle.ride()).toBe('The bicycle (101) is now riding on the road!');
    });

    fit('should not allow riding if the chain is off', () => {
        bicycle.removeChain();
        expect(bicycle.ride()).toBe('The bicycle (101) can\'t ride because the chain is off!');
    });
});