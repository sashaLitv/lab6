import { IMovable } from "../../interfaces/vehicle.interfaces";
import { Vehicle } from "../vehicle";
import { VehicleType, vehicleType } from "../vehicleName";

export class GenericVehicle extends Vehicle implements IMovable {
    private type: VehicleType;

    constructor(
        id: string,
        rentalPrice: number,
        available: boolean,
        lastRentDay: Date | null,
        type: VehicleType 
    ) {
        super(id, rentalPrice, available, lastRentDay);
        this.type = type;
    }

    move(): string {
        return `The ${this.getType()} (${this.getID()}) is moving.`;
    }

    override stop(): string {
        return `The ${this.getType()} (${this.getID()}) has stopped.`;
    }

    override getDetails(): string[] {
        let details: string[] = super.getDetails(); 
        return details;
    }

    override getType(): VehicleType {
        return this.type;
    }
}