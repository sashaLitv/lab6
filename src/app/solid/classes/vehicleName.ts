export type VehicleType = "Motorbike" | "Passenger Car" | "Truck" | "Bicycle";

export const vehicleType: ReadonlyArray<VehicleType> = [
    "Motorbike", 
    "Passenger Car", 
    "Truck",
    "Bicycle",
] as const;

function generateCombinations<T>(arr: T[]): T[][] {
    const result: T[][] = [];
  
    const total = 1 << arr.length; 
  
    for (let mask = 1; mask < total; mask++) { 
      const combination: T[] = [];
      for (let i = 0; i < arr.length; i++) {
        if (mask & (1 << i)) {
          combination.push(arr[i]);
        }
      }
      result.push(combination);
    }
  
    return result;
}

export const vehicleCombinations: VehicleType[][] = generateCombinations([...vehicleType]);

console.log(vehicleCombinations);