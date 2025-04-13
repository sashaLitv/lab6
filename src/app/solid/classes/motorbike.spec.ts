import { Motorbike } from "./motorbike";
import { Vehicle } from "./vehicle";

describe('Motorbike class tests', () => {
    let motorbike: Motorbike;

    beforeEach(() => {
        motorbike = new Motorbike(102, 15, true, null, true); 
    });

    fit('should create a motorbike', () => {
        expect(motorbike).toBeTruthy();
    });

    fit('should get correct ABS value', () => {
        expect(motorbike.getAbs()).toBe(true);  
    });

    fit('should return correct type', () => {
        expect(motorbike.getType()).toBe('Motorbike');
    });

    fit('should return correct details', () => {
        const details = motorbike.getDetails();
        expect(details).toContain('ABS: true');
    });

    fit('should stop correctly', () => {
        expect(motorbike.stop()).toBe('The motorbike (102) has stopped.');
    });

    fit('should drift correctly', () => {
        expect(motorbike.drift()).toBe('The motorbike (102) is now drifting!');
    });

    fit('should move correctly', () => {
        expect(motorbike.move()).toBe('The motorbike (102) is moving.');
    });

    fit('should perform wheelie correctly', () => {
        expect(motorbike.doWheelie()).toBe('The motorbike is doing a wheelie!');
    });
});