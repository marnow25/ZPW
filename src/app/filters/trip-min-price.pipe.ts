import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripMinPrice'
})
export class TripMinPricePipe implements PipeTransform {

  transform(trips: Array<Trip>, minPrice: number): Array<Trip> {
    if (!minPrice) {
      return trips;
    }

    return trips.filter(trip => trip.price >= minPrice );
  }

}
