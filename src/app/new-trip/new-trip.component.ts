import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent {

  @Output() addTripEmitter = new EventEmitter<Trip>();

  tripForm = new FormGroup({
    name: new FormControl(''),
    destination: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    rating: new FormControl(''),
    price: new FormControl(''),
    limit: new FormControl(''),
    description: new FormControl(''),
    imageSrc: new FormControl('')
  });

  onSubmit() {
    this.addTripEmitter.emit(this.tripForm.value);
    this.tripForm.reset();
  }
}
