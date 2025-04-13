import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/solid/classes/vehicle';
import { FormBuilder } from '@angular/forms';
import { dateValidator } from '../../solid/validators/dateValidator';
import { formConstructor } from '../formСonstructor';
import { VehicleFactory } from 'src/app/solid/classes/vehicleFactory';
import { vehicleType } from 'src/app/solid/classes/vehicleName';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, IonicModule],
  standalone: true,
})
export class EditProductComponent  implements OnInit {
  @Input() vehicle!: Vehicle;
  @Output() vehicleEdit: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();

  vehicleForm!: FormGroup;
  types = vehicleType;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      id: [this.vehicle.getID()], 
      type: [this.vehicle.getType()],
      rentalPrice: [this.vehicle.getRentalPrice(), [Validators.required, Validators.min(1)]],
      available: [this.vehicle.isAvailable()],
      lastRentDay: [this.vehicle.getLastRentDay(), [dateValidator]],
    });

    formConstructor(this.vehicle.getType(), this.vehicleForm, this.fb);

    const allControls = Object.keys(this.vehicleForm.controls);
    const lastKey = allControls[allControls.length - 1];
    
  }
  onSubmit() {
    if(this.vehicleForm.valid){
      const formData = this.vehicleForm.value;
      formData.type = this.vehicle.getType();

      const vehicle = VehicleFactory.create(formData);
      this.vehicleEdit.emit(vehicle);
      console.log('Форма валідна');
    }
    else {
      this.vehicleForm.markAllAsTouched();
      console.log('Упс, щось пішло не так....');
    }
  }

}
