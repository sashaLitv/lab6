import { TestBed } from '@angular/core/testing';
import { DateValidatorService } from '../services/dateValidator.service';


describe('DateValidatorService Test', () => {
    let service: DateValidatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DateValidatorService);
    });

    fit('should be created', () => {
        expect(service).toBeTruthy();
    });

    fit('should validate a valid date', () => {
        let str = service.validateDate('05-11-2023');
        expect(str).toBe(true);
    });

    fit('should invalidate an invalid date', () => {
        let str = service.validateDate('hidden');
        expect(str).toBe(false);
    });

    fit('should invalidate an invalid date 2', () => {
        let str = service.validateDate('2023-00-00');
        expect(str).toBe(false);
    });

    fit('should invalidate an invalid date 3', () => {
        let str = service.validateDate('9-00-00');
        expect(str).toBe(false);
    });

});