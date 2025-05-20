import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { vehicleType, VehicleType } from '../../solid/classes/vehicleName';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dateValidator } from '../../solid/validators/dateValidator';
import { VehicleFactory } from '../../solid/classes/vehicleFactory';
import { formConstructor } from '../formСonstructor';
import { Vehicle } from 'src/app/solid/classes/vehicle';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, IonicModule],
  standalone: true,
})
export class AddVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  currentType: VehicleType = vehicleType[3];
  types = vehicleType;

  @Output() vehicleAdd: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      type: [this.currentType, Validators.required],
      rentalPrice: ['', [Validators.required, Validators.min(1)]],
      available: [true],
      lastRentDay: ['', [dateValidator]],
    });
  }

  ngOnInit() {
    this.OnTypeChange(this.currentType);
  }

  OnTypeChange(type: any): void {
    this.currentType = type as VehicleType;
    formConstructor(this.currentType, this.vehicleForm, this.fb);
  }

  onSubmit(): void {
    if(this.vehicleForm.valid) {
      const formData = this.vehicleForm.value;
      formData.type = this.currentType;

      const vehicle = VehicleFactory.create(formData);

      this.vehicleAdd.emit(vehicle);

      console.log('Форма валідна');
    } else {
      this.vehicleForm.markAllAsTouched();
      console.log('Упс, щось пішло не так....');
    }
  }

}
