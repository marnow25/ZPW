import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripMaxPrice'
})
export class TripMaxPricePipe implements PipeTransform {

  transform(trips: Array<Trip>, maxPrice: number): Array<Trip> {
    if (!maxPrice) {
      return trips;
    }

    return trips.filter(trip => trip.price <= maxPrice );
  }
}
