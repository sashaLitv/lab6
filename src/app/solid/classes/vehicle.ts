import { IVehicle, IStopable, IAvailability, IRentable} from "../interfaces/vehicle.interfaces";

export abstract class Vehicle implements IVehicle, IStopable, IAvailability, IRentable {
    private id: number;
    private rentalPrice: number;
    private available: boolean;
    private lastRentDay: Date | null;

    constructor(id: number, rentalPrice: number, available: boolean, lastRentDay: Date | null) {
        this.id = id;
        this.rentalPrice = rentalPrice;
        this.available = available;
        this.lastRentDay = lastRentDay || null;
    }

    getID(): number {
        return this.id;
    }
    getRentalPrice(): number {
        return this.rentalPrice;
    }
    getType(): string {
        return 'Vehicle';
    }
    getDetails(): string[] {
        let details: string[] = [];
        details.push(`ID: ${this.getID()}`);
        details.push(`Type: ${this.getType()}`);
        details.push(`Rental Price: $${this.getRentalPrice()}`);
        details.push(`Available: ${this.isAvailable() ? 'Yes' : 'No'}`);
        details.push(`Last Rent Day: ${this.getLastRentDay()}`);

        return details;
    }
    
    getLastRentDay(): string {
        if (this.lastRentDay) {
            return this.lastRentDay.toLocaleDateString();  
        } else {
            return 'Not available';  
        }
    }
    setLastRentDay(): void {
        this.lastRentDay = new Date();
    }

    isAvailable(): boolean {
        return this.available;
    }
    setAvailability(): void {
        this.available = !this.available;
    }


    stop(): string {
        return `The vehicle (${this.getID()}) has stopped.`;
    }
}