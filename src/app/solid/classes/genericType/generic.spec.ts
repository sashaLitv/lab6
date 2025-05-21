import { GenericVehicle } from "./genericVehicle";
import { vehicleType } from '../vehicleName';

describe('GenericVehicle', () => {
  let vehicle: GenericVehicle;

  beforeEach(() => {
    vehicle = new GenericVehicle('123ABC', 100, true, null, 'Hovercar');
  });

  fit('should create an instance', () => {
    expect(vehicle).toBeTruthy();
  });

  fit('should return correct ID', () => {
    expect(vehicle.getID()).toBe('123ABC');
  });

  fit('should return correct name type', () => {
    expect(vehicle.getNameType()).toBe('Hovercar');
  });

  fit('should return correct type from vehicleType', () => {
    expect(vehicle.getType()).toBe(vehicleType[4]); // "Generic"
  });

  fit('should move correctly', () => {
    expect(vehicle.move()).toBe('The Hovercar (123ABC) is moving.');
  });

  fit('should stop correctly', () => {
    expect(vehicle.stop()).toBe('The Hovercar (123ABC) has stopped.');
  });

  fit('should return correct details', () => {
    const details = vehicle.getDetails();
    expect(details).toContain('Name Type: Hovercar');
    expect(details.length).toBeGreaterThan(0);
  });
});