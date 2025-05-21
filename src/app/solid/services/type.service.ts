import { Injectable } from '@angular/core';
import { vehicleType, generateCombinations, vehicleCombinations } from '../classes/vehicleName';
import { Database, ref, update, get} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class TypeService {

  constructor(private db: Database) {}

  async addVehicleType(): Promise<void> {
    const newType = prompt('Enter new vehicle type (e.g., Scooter):');
    if (!newType) {
      console.log('No vehicle type provided.');
      return;
    }
    if (vehicleType.includes(newType)) {
      console.log('Vehicle type already exists.');
      return;
    }
    vehicleType.push(newType);
    vehicleCombinations.length = 0;
    vehicleCombinations.push(...generateCombinations([...vehicleType]));
    console.log(`Added new vehicle type: ${newType}`);

  }

  async deleteVehicleType(): Promise<void> {
    const typeToDelete = prompt('Enter vehicle type to delete:');
    if (!typeToDelete) {
      console.log('No vehicle type provided.');
      return;
    }
    if (!vehicleType.includes(typeToDelete)) {
      console.log('Vehicle type does not exist.');
      return;
    }
    const vehiclesRef = ref(this.db, 'vehicles');
    const snapshot = await get(vehiclesRef);

    if (!snapshot.exists()) {
      console.log('No vehicles found in database.');
      return;
    }

    const updates: { [key: string]: null } = {};
    snapshot.forEach(childSnapshot => {
      const vehicle = childSnapshot.val();
      if (vehicle.type === typeToDelete) {
        updates[childSnapshot.key!] = null;
      }
    });

    if (Object.keys(updates).length > 0) {
      await update(vehiclesRef, updates);
      console.log(`Deleted all vehicles of type: ${typeToDelete}`);
    } else {
      console.log(`No vehicles found with type: ${typeToDelete}`);
    }

    const index = vehicleType.indexOf(typeToDelete);
    if (index > -1) {
      vehicleType.splice(index, 1);
    }

    vehicleCombinations.length = 0;
    vehicleCombinations.push(...generateCombinations([...vehicleType]));

    console.log(`Deleted vehicle type: ${typeToDelete}`);
  }
}