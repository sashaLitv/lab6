import { Vehicle } from "./vehicle";
import { IDriftable, IMovable, IWheelieable}  from "../interfaces/vehicle.interfaces";

export class Motorbike extends Vehicle implements IDriftable, IMovable, IWheelieable{
    // (Антиблокувальна система гальм)
    private abs: boolean;  

    constructor(id: number, rentalPrice: number, avaliable: boolean, lastRentDay: Date | null, abs: boolean) {
        super(id, rentalPrice, avaliable, lastRentDay);
        this.abs = abs;
    }

    getAbs(){
        return this.abs;
    }

    override getType(): string {
        return 'Motorbike';
    }
    override getDetails(): string[] {
        let details: string[] = super.getDetails(); 
        details.push(`ABS: ${this.getAbs()}`);
        return details;
    }
    override stop(): string {
        return `The motorbike (${this.getID()}) has stopped.`;
    }

    drift(): string {
        return `The motorbike (${this.getID()}) is now drifting!`;
    }
    move(): string {
        return `The motorbike (${this.getID()}) is moving.`;
    }
    doWheelie(): string {
        return "The motorbike is doing a wheelie!";
    }
}