import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';

@Pipe({
  name: 'tripEndDate'
})
export class TripEndDatePipe implements PipeTransform {

  transform(trips: Array<Trip>, dateString: string): Array<Trip> {
    if (!dateString) {
      return trips;
    }

    const date = new Date(dateString);
    return trips.filter(trip => new Date(trip.startDate) < date );
  }

}
