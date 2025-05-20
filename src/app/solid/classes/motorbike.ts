import { Vehicle } from "./vehicle";
import { IDriftable, IMovable, IWheelieable}  from "../interfaces/vehicle.interfaces";
import { vehicleType } from "./vehicleName";

export class Motorbike extends Vehicle implements IDriftable, IMovable, IWheelieable{
    // (Антиблокувальна система гальм)
    private Abs: boolean;  

    constructor(id: string, rentalPrice: number, avaliable: boolean, lastRentDay: Date | null, Abs: boolean) {
        super(id, rentalPrice, avaliable, lastRentDay);
        this.Abs = Abs;
    }

    getAbs(){
        return this.Abs;
    }
    override getDetails(): string[] {
        let details: string[] = super.getDetails(); 
        details.push(`ABS: ${this.getAbs()}`);
        return details;
    }
    override stop(): string {
        return `The motorbike (${this.getID()}) has stopped.`;
    }
    override getType(){
        return vehicleType[0];
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