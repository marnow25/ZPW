import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TripsComponent } from './trips.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule} from '@angular/router/testing';
import { Trip } from 'src/app/models/trip';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { TripMinRatingPipe } from 'src/app/filters/trip-min-rating.pipe';
import { TripMinPricePipe } from 'src/app/filters/trip-min-price.pipe';
import { TripMaxPricePipe } from 'src/app/filters/trip-max-price.pipe';
import { TripStartDatePipe } from 'src/app/filters/trip-start-date.pipe';
import { TripEndDatePipe } from 'src/app/filters/trip-end-date.pipe';
import { TripDestinationPipe } from 'src/app/filters/trip-destination.pipe';
import { Observable, of } from 'rxjs';
import { TripService } from 'src/app/services/trip.service';
import 'zone.js/dist/zone-testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';




class MockTripService {
  trips = [];

  getTrips(): Observable<string[]>{
    return of(['1410']);
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
    return of(['1410']);
  }

  removeTrip(id: number) {
    this.trips = [];

    return of(['1410']);
  }

  countTrips(): number{
    return this.trips.length;
  }
}

describe('TripsComponent', () => {
  let component: TripsComponent;
  let fixture: ComponentFixture<TripsComponent>;
  let tripService: MockTripService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, HttpClientModule, RouterTestingModule],
      declarations: [ TripsComponent, TripMinRatingPipe, TripMinPricePipe, TripMaxPricePipe, TripDestinationPipe, TripStartDatePipe, TripEndDatePipe ],
      providers: [
        {provide: TripService, useClass: MockTripService}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    tripService = TestBed.get(TripService);

    let trip1 = {id: '22323'} as Trip;
    let trip2 = {id: '22323'} as Trip;
    component.trips = [trip1, trip2];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new trip', () => {
   let trip = { name: 'test', price: 1950, startDate: new Date('11/11/2019'), endDate: new Date('12/12/2019'), rating: 5, destination: 'Polska', limit: 25, id: '1410', description: 'Trip to Poland', imageSrc:'' } as Trip;
      component.addTrip(trip);
      let count = tripService.countTrips();
      expect(count).toEqual(1);
  });

  it('should not add new trip while name is empty', () => {
      let trip = {name: '', price: 1950, startDate: new Date('11/11/2019'), endDate: new Date('12/12/2019'), rating: 5, destination: 'Polska', limit: 25, id: '1410', description: 'Trip to Poland', imageSrc:'' } as Trip;
      component.addTrip(trip);
      let count = tripService.countTrips();
      console.log(count);
      expect(count).toEqual(0);
  });

  it('should not add new trip with price below zero', () => {
      let trip = { name: 'test', price: -1950, startDate: new Date('11/11/2019'), endDate: new Date('12/12/2019'), rating: 5, destination: 'Polska', limit: 25, id: '1410', description: 'Trip to Poland', imageSrc:'' } as Trip;
      component.addTrip(trip);
      let count = tripService.countTrips();
      expect(count).toEqual(0);
  });

  it('should not add new trip without any limit', () => {
      let trip = { name: 'test', price: 1950, startDate: new Date('11/11/2019'), endDate: new Date('12/12/2019'), rating: 53, destination: 'Polska', id: '1410', description: 'Trip to Poland', imageSrc:'' } as Trip;
      component.addTrip(trip);
      let count = tripService.countTrips();
      expect(count).toEqual(0);
  });

  it('should not add new trip without any startDate', () => {
   let trip = { name: 'test', price: 1950, endDate: new Date('12/12/2019'), rating: 3, destination: 'Polska', id: '1410', description: 'Trip to Poland', imageSrc:'' } as Trip;
   component.addTrip(trip);
   let count = tripService.countTrips();
      expect(count).toEqual(0);
  });

  it('should not add new trip without any endDate', () => {
    let trip = { name: 'test', price: 1950, startDate: new Date('11/11/2019'), rating: 3, destination: 'Polska', id: '1410', description: 'Trip to Poland', imageSrc:'' } as Trip;
    component.addTrip(trip);
    let count = tripService.countTrips();
       expect(count).toEqual(0);
   });

   it('should not add new trip without destination', () => {
    let trip = { name: 'test', price: 1950, startDate: new Date('11/11/2019'), endDate: new Date('12/12/2019'), rating: 3, destination: '', id: '1410', description: 'Trip to Poland', imageSrc:'' } as Trip;
    component.addTrip(trip);
    let count = tripService.countTrips();
       expect(count).toEqual(0);
   });

   it('should not add new trip without description', () => {
    let trip = { name: 'test', price: 1950, startDate: new Date('11/11/2019'), endDate: new Date('12/12/2019'), rating: 3, destination: 'Poland', id: '1410', description: '', imageSrc:'' } as Trip;
    component.addTrip(trip);
    let count = tripService.countTrips();
       expect(count).toEqual(0);
   });


  it('should remove trip as requested', () => {
      let trip = { name: 'test', price: 1950, startDate: new Date('11/11/2019'), endDate: new Date('12/12/2019'), rating: 3, destination: 'Polska', limit: 25, id: 'ss', description: 'Trip to Poland', imageSrc:'' } as Trip;
      tripService.addTrip(trip);
      component.removeTrip(trip);
      let count = tripService.countTrips();
      expect(count).toEqual(0);
  });
});
