import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Trip } from '../models/trip';
import { Injectable } from '@angular/core';
import { TRIPS } from '../mock/trips-mock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const trips = TRIPS;
    return {trips};
  }

  // Generate new id
  genId(trips: Trip[]): number {
    return trips.length > 0 ? Math.max(...trips.map(trip => +trip.id)) + 1 : 11;
  }
}
