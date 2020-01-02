import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripMinRating'
})
export class TripMinRatingPipe implements PipeTransform {

  transform(trips: Array<Trip>, minimumRating: number): Array<Trip> {
    if (!minimumRating) {
      return trips;
    }

    return trips.filter(trip => trip.rating >= minimumRating );
  }

}
