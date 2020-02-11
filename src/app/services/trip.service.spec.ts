import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Trip } from 'src/app/models/trip';
import { Observable, of } from 'rxjs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

//TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

class MockTripService {
  trips = [];

  getTrips(): Observable<string[]> {
    return of(['1410']);
  }

  getTrip(id): Observable<string[]> {
    return id;
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
    return of(trip);
  }

  removeTrip(id: number) {
    this.trips = [];
    this.trips.pop();
    return this.trips;
  }

  countTrips(): number {
    return this.trips.length;
  }

  updateTrip(id: number, trip: Trip) {
    this.trips.pop();
    this.trips.push(trip);
    return this.trips;
  }

}

describe('TripService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, FormsModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, HttpClientModule, RouterTestingModule],
    providers: [
      { provide: TripService, useClass: MockTripService }
    ],
  }));

  it('should be created', () => {
    const tripService: TripService = TestBed.get(TripService);
    expect(tripService).toBeTruthy();
  });

  it('should get all trips', (done) => {
    const tripService: TripService = TestBed.get(TripService);
    tripService.getTrips().subscribe((result) => {
      let count = result.length;
      expect(count).toBeGreaterThan(0);
      done();
    })
  });

  it('should get particular trip ', (done) => {
    let trip = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    const tripService: TripService = TestBed.get(TripService);
    tripService.addTrip(trip);
    const result = tripService.getTrip('Poland Trip');
    expect(result.toString()).toEqual('Poland Trip');
    done();
  });

  it('should remove particular trip ', (done) => {
    let trip = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    const tripService: TripService = TestBed.get(TripService);
    tripService.addTrip(trip);
    const result = tripService.removeTrip(trip);
    expect(result.toString()).toEqual('');
    done();
  });

  it('should update particular trip ', (done) => {
    let trip1 = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    let trip2 = { id: '1', rating: 4, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    let testTable = [];
    testTable.push(trip2);
    const tripService: TripService = TestBed.get(TripService);
    tripService.addTrip(trip1);
    const result = tripService.updateTrip(1, trip2);
    expect(result).toEqual(testTable);
    done();
  });
});
