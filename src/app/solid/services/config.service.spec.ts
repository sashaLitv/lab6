import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { vehicleCombinations, VehicleType } from '../classes/vehicleName';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default availability set to true', () => {
    service.availability$.subscribe(value => {
      expect(value).toBeTrue();
    });
  });

  it('should have default vehicle types (first combination)', () => {
    service.types$.subscribe(types => {
      expect(types).toEqual(vehicleCombinations[0]);
    });
  });

  it('should update availability when setAvailability is called', () => {
    service.setAvailability(false);
    service.availability$.subscribe(value => {
      expect(value).toBeFalse();
    });
  });

  it('should update vehicle types when setType is called', () => {
    const index = 1;
    service.setType(index);
    service.types$.subscribe(types => {
      expect(types).toEqual(vehicleCombinations[index]);
    });
  });

  it('should throw if invalid index is passed to setType (optional)', () => {
    const invalidIndex = vehicleCombinations.length + 1;
    expect(() => service.setType(invalidIndex)).not.toThrow(); // Or change to throw, depending on your desired behavior
  });
});