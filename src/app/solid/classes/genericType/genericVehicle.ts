import { IMovable } from "../../interfaces/vehicle.interfaces";
import { Vehicle } from "../vehicle";
import { vehicleType } from "../vehicleName";

export class GenericVehicle extends Vehicle implements IMovable {
    private nameType;
    constructor(id: string, rentalPrice: number, available: boolean, lastRentDay: Date | null, name: string) {
        super(id, rentalPrice, available, lastRentDay);
        this.nameType = name;
    }

    move(): string {
        return `The ${this.nameType} (${this.getID()}) is moving.`;
    }
    getNameType(){
        return this.nameType;
    }
    override stop(): string {
        return `The ${this.nameType} (${this.getID()}) has stopped.`;
    }
    override getDetails(): string[] {
        let details: string[] = super.getDetails(); 
        details.push(`Name Type: ${this.getNameType()}`);
        return details;
    }
    override getType(){
        return vehicleType[4];
    }
    
}