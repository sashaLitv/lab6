import { Vehicle } from "./vehicle";
import { IDriftable, IMovable } from "../interfaces/vehicle.interfaces";

export class PassengerCar extends Vehicle implements IDriftable, IMovable {
    private passengerSeats: number;
    private availableSeats: number;  

    constructor(id: number, rentalPrice: number, available: boolean, lastRentDay: Date | null, passengerSeats: number) {
        super(id, rentalPrice, available, lastRentDay);
        this.passengerSeats = passengerSeats;
        this.availableSeats = passengerSeats; 
    }

    getMaxSeats(): number {
        return this.passengerSeats;
    }
    sit(): string {
        if (this.availableSeats > 0) {
            this.availableSeats--;
            return `A person has sat down. There are ${this.availableSeats} seats left.`;
        } else {
            return "No available seats left!";
        }
    }
    getAvailableSeats(): number {
        return this.availableSeats;
    }
    exit_all(){
        this.availableSeats = this.passengerSeats;
        return `All passengers have exited. There are ${this.availableSeats} seats available.`;
    }

    override getType(): string {
        return 'Passenger Car';
    }
    override getDetails(): string[] {
        let details: string[] = super.getDetails(); 
        details.push(`Passenger Seats: ${this.getMaxSeats()}`);
        return details;
    }
    override stop(): string {
        return `The passenger car (${this.getID()}) has stopped.`;
    }

    drift(): string {
        return `WoW, the passenger car (${this.getID()}) also can drift!`;
    }

    move(): string {
        return `The passenger car (${this.getID()}) is moving.`;
    }
}