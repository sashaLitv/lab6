import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { vehicleCombinations, VehicleType } from '../classes/vehicleName';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should have default availability set to true', () => {
    service.availability$.subscribe(value => {
      expect(value).toBeTrue();
    });
  });

  fit('should have default vehicle types (first combination)', () => {
    service.types$.subscribe(types => {
      expect(types).toEqual(vehicleCombinations[0]);
    });
  });

  fit('should update availability when setAvailability is called', () => {
    service.setAvailability(false);
    service.availability$.subscribe(value => {
      expect(value).toBeFalse();
    });
  });

  fit('should update vehicle types when setType is called', () => {
    const index = 1;
    service.setType(index);
    service.types$.subscribe(types => {
      expect(types).toEqual(vehicleCombinations[index]);
    });
  });
});