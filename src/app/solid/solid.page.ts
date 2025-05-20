import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyHeaderComponent } from '../my-header/my-header.component';
import { VehicleService } from './services/vehicle.service';
import { Vehicle } from './classes/vehicle';
import { Motorbike } from './classes/motorbike';
import { Bicycle } from './classes/bicycle';
import { Truck } from './classes/truck';
import { PassengerCar } from './classes/passengerCar';
import { AddVehicleComponent } from '../forms/add-vehicle/add-vehicle.component';
import { EditProductComponent } from '../forms/edit-vehicle/edit-vehicle.component';
import { ConfigService } from './services/config.service';
import { vehicleCombinations,vehicleType, VehicleType } from './classes/vehicleName';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solid',
  templateUrl: './solid.page.html',
  styleUrls: ['./solid.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MyHeaderComponent, IonicModule, AddVehicleComponent, EditProductComponent],
})
export class SolidPage implements OnInit {
  statusMessages: Map<string, any> = new Map();
  showAddVehicleModal = false;
  showEditVehicleModal = false;
  editIndex = 0;
  copyVehicles: Vehicle[] = [];
  vehicleType = vehicleType;


  private configService = new ConfigService();
  private subscriptions: Subscription[] = [];
  types: VehicleType[] = vehicleCombinations[0];
  availability: boolean = true;
  countType = 0;

  constructor(public vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.fetchVehicles();

    const typeSub = this.configService.types$.subscribe((types) => {
      this.types = types;
    });

    const availabilitySub = this.configService.availability$.subscribe((availability) => {
      this.availability = availability;
    });

    const vehicleSub = this.vehicleService.vehicles$.subscribe(vehicles => {
      this.vehicleService.copyVehicles = [...vehicles]; 
    });

    this.subscriptions.push(typeSub);
    this.subscriptions.push(availabilitySub);
    this.subscriptions.push(vehicleSub);
  }
  ngOnDestroy(){
    this.subscriptions.forEach((s) => s.unsubscribe());
  }



  bookVehicle(vehicle: Vehicle): void {
    vehicle.setAvailability();
    if (!vehicle.isAvailable()) {
      alert(`Vehicle ID ${vehicle.getID()} has been booked!`);
      vehicle.setLastRentDay();
    }
    else{
      this.clearStatus(vehicle);
      if(vehicle instanceof PassengerCar) vehicle.exit_all();
      if(vehicle instanceof Truck) vehicle.unload_all();
    }
  
  }

  callSpecialFunction(functionName: string, vehicle: Vehicle): void {
    const actions: Record<string, () => any> = {
      move: () => (vehicle instanceof Motorbike || vehicle instanceof PassengerCar || vehicle instanceof Truck)? vehicle.move() : null,
      stop: () => vehicle.stop(),
      drift: () => (vehicle instanceof Motorbike || vehicle instanceof PassengerCar) ? vehicle.drift() : null,
      wheelie: () => (vehicle instanceof Motorbike || vehicle instanceof Bicycle) ? vehicle.doWheelie() : null,
      ride: () => vehicle instanceof Bicycle ? vehicle.ride() : null,
      remove: () => vehicle instanceof Bicycle ? vehicle.removeChain() : null,
      reinstall: () => vehicle instanceof Bicycle ? vehicle.reinstallChain() : null,
      current: () => vehicle instanceof Truck ? vehicle.getCurrentCargoCapacity() : null,
      load: () => vehicle instanceof Truck ? vehicle.loadCargo(100) : null,
      sit: () => vehicle instanceof PassengerCar ? vehicle.sit() : null,
      avaliable: () => vehicle instanceof PassengerCar ? vehicle.getAvailableSeats() : null,
      unload: () => vehicle instanceof Truck ? vehicle.unload_all() : null,
      exit: () => vehicle instanceof PassengerCar ? vehicle.exit_all() : null
    };
  
    if (functionName in actions) {
      const message = actions[functionName]?.();
      if (message !== null && message !== undefined) {
        this.statusMessages.set(vehicle.getID(), message);
      }
    }
  }

  getStatusMessage(vehicle: Vehicle): string {
    return this.statusMessages.get(vehicle.getID()) || 'No actions performed yet';
  }
  clearStatus(vehicle: Vehicle): void {
    this.statusMessages.delete(vehicle.getID());
  }


  addFormShow(){
    this.showAddVehicleModal = !this.showAddVehicleModal;
  }
  addVehicle($event: any){
    this.vehicleService.addVehicle($event);
    this.showAddVehicleModal = false;
  }

  editFormShow(i: number){
    this.editIndex = i;
    this.showEditVehicleModal = !this.showEditVehicleModal;
  }
  editVehicle($event: any, i: number){
    this.vehicleService.editVehicle($event);
    this.showEditVehicleModal = false;
  }

  removeVehicle(vehicle: Vehicle){
    this.vehicleService.removeVehicle(vehicle.getID());
    console.log(this.vehicleService.searchVehicles);
  }



  nextType(){
    if(this.countType < vehicleCombinations.length - 1)   this.countType++;
    else this.countType = 0;

    this.configService.setType(this.countType)
  }

  nextAvailability(){
    if(this.availability === false)               this.availability = true;
    else if (this.availability === true)          this.availability = false;

    this.configService.setAvailability(this.availability)
  }

  

}