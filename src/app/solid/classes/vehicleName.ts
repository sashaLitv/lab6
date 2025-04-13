export type VehicleType = "Motorbike" | "Passenger Car" | "Truck" | "Bicycle";

export const vehicleType: ReadonlyArray<VehicleType> = [
    "Motorbike", 
    "Passenger Car", 
    "Truck",
    "Bicycle"
] as const;