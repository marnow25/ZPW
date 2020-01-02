import { Injectable } from '@angular/core';
import { Trip } from '../models/trip'
import { TripService } from './trip.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
 
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: Trip[] = []

  constructor(
    private tripService: TripService, 
    private router: Router,
    private authenticationService: AuthenticationService) { 

    //Load from localStorage
    const shoppingCartString = localStorage.getItem('shoppingCart');
    if (shoppingCartString) {
      const shoppingCart = JSON.parse(shoppingCartString);
      const uniqueIds = [...new Set(shoppingCart.map((trip: Trip) => trip.id))];
      uniqueIds.forEach(id => {
          const count = shoppingCart.filter((trip: Trip) => trip.id === id).length;
          console.log(count);
          this.tripService.getTrip(id).subscribe(trip => this.shoppingCart.push(...Array(count).fill(trip)));
      });
    }
  }

  getTripsFromShoppingCart(): Array<Trip> {
    return this.shoppingCart;
  }

  addTripToShoppingCart(trip: Trip) {
    if (this.existsInShoppingCart(trip)) { // Overide if exits, to make sure it's the same element
      trip = this.shoppingCart.find(i => i.id === trip.id);
    }
    this.shoppingCart.push(trip);
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  deleteTripFromShoppingCart(trip: Trip) {
    const index = this.shoppingCart.indexOf(trip);
    if (index > -1) {
      this.shoppingCart.splice(index, 1);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
  }

  existsInShoppingCart(trip: Trip): boolean {
    return !(this.shoppingCart.find(i => i.id === trip.id) === undefined);
  }

  countTripsInShoppingCart(): number {
    return this.shoppingCart.length;
  }

  countTripInShoppingCart(trip: Trip) {
    return this.shoppingCart.filter(t => t === trip).length;
  }

  getUniqueTripsInShoppingCart(): Set<Trip> {
    return new Set(this.shoppingCart);
  }

  orderTrips() {
    if (!this.authenticationService.getUser()) { this.router.navigate(['/log-in']); return; }
    this.tripService.orderTrips(this.shoppingCart); // .subscribe(item => console.log('Bought'));
    this.shoppingCart = [];
    localStorage.removeItem('shoppingCart');
  }


}
