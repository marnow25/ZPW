import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip'

@Pipe({
  name: 'tripDestination'
})
export class TripDestinationPipe implements PipeTransform {

  transform(trips: Array<Trip>, destination: string): Array<Trip> {
    if (!destination) {
      return trips;
    }
    return trips.filter(trip => trip.destination.toLowerCase().includes(destination.toLowerCase()) );
  }

}
