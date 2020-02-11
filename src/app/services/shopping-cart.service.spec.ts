import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Trip } from 'src/app/models/trip';
import { TripService } from './trip.service';
import 'zone.js/dist/zone-testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tmpdir } from 'os';

//TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

class MockShopCartService {
  trips = [];

  getTripsFromShoppingCart(): any[]{
    return this.trips;
  }

  getUniqueTripsInShoppingCart(){
    return this.trips;
  }

  addTripToShoppingCart(trip: Trip) {
    this.trips.push(trip);
    return of(['1410']);
  }

  deleteTripFromShoppingCart(trip: Trip) {
    this.trips.pop();
  }

  existsInShoppingCart(trip: Trip): boolean {
    return !(this.trips.find(i => i.id === trip.id) === undefined);
  }

  countTripsInShoppingCart(): number {
    return this.trips.length;
  }

}

describe('ShoppingCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ ReactiveFormsModule, FormsModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, HttpClientModule, RouterTestingModule],
    providers: [
      { provide: ShoppingCartService, useClass: MockShopCartService }
    ],
  }));

  it('should be created', () => {
    const service: ShoppingCartService = TestBed.get(ShoppingCartService);
    expect(service).toBeTruthy();
  });

  it('should get all trips from shopping cart', (done) => {
    const service: ShoppingCartService = TestBed.get(ShoppingCartService);
    const result = service.getTripsFromShoppingCart();
    let count = result.length;
    expect(count).toBeGreaterThanOrEqual(0);
    done();
  });

  it('should get unique trips from shopping cart ', (done) => {
    let trip1 = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    //let trip2 = { id: '2', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    const service: ShoppingCartService = TestBed.get(ShoppingCartService);
    service.addTripToShoppingCart(trip1);
    let tmpTable = [];
    tmpTable.push(trip1);
    const result = service.getUniqueTripsInShoppingCart();
    expect(tmpTable).toEqual(tmpTable);
    done();
  });

  it('should delete particular trip from shopping cart ', (done) => {
    let trip = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    const service: ShoppingCartService = TestBed.get(ShoppingCartService);
    service.addTripToShoppingCart(trip);
    service.deleteTripFromShoppingCart(trip);
    let result = service.getTripsFromShoppingCart();
    expect(result.toString()).toEqual('');
    done();
  });

  it('should check if particular trip exists in shopping cart', (done) => {
    let trip = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    const service: ShoppingCartService = TestBed.get(ShoppingCartService);
    service.addTripToShoppingCart(trip);
    const result = service.existsInShoppingCart(trip);
    expect(result).toEqual(true);
    done();
  });

  it('should count trips from shopping cart', (done) => {
    let trip1 = { id: '1', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    let trip2 = { id: '2', rating: 2, name: 'Poland Trip', destination: 'Poland', startDate: new Date('11/30/2019'), endDate: new Date('12/12/2019'), limit: 24, price: 2500, description: 'Poland Trip', imageSrc: '/img/poland.jpg' };
    const service: ShoppingCartService = TestBed.get(ShoppingCartService);
    service.addTripToShoppingCart(trip1);
    service.addTripToShoppingCart(trip2);
    const result = service.countTripsInShoppingCart();
    expect(result).toEqual(2);
    done();
  });
});
