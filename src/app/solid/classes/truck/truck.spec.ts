import { Truck } from "./truck";
import { vehicleType } from "../vehicleName";

describe('Truck class tests', () => {
    let truck: Truck;

    beforeEach(() => {
        truck = new Truck('104', 100, true, null, 2000); 
    });

    fit('should create truck successfully', () => {
        expect(truck).toBeTruthy();
    });

    fit('should get correct maximum cargo capacity', () => {
        expect(truck.getMaxCargoCapacity()).toBe(2000);
    });

    fit('should get correct current cargo capacity', () => {
        expect(truck.getCurrentCargoCapacity()).toBe(0);
    });

    fit('should load cargo correctly', () => {
        expect(truck.loadCargo(500)).toBe('Cargo loaded! Current cargo weight: 500 kg.');
        expect(truck.loadCargo(1000)).toBe('Cargo loaded! Current cargo weight: 1500 kg.');
    });

    fit('should not exceed cargo capacity', () => {
        truck.loadCargo(1950);
        expect(truck.loadCargo(100)).toBe('Sorry, cabin is full! Current cargo weight: 1950 kg.');
    });

    fit('should get correct truck type', () => {
        expect(truck.getType()).toBe(vehicleType[2]);
    });

    fit('should get correct truck details', () => {
        const details = truck.getDetails();
        expect(details).toContain('Cargo capacity: 2000');
    });

    fit('should move correctly', () => {
        expect(truck.move()).toBe('The truck (104) is moving.');
    });

    fit('should stop correctly', () => {
        expect(truck.stop()).toBe('The truck (104) has stopped.');
    });
});