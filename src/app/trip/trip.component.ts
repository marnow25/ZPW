import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  @Input() trip: Trip;
  @Input() special: boolean;
  @Output() removeTripEmitter = new EventEmitter<Trip>();


  constructor(
    private shoppingCartService: ShoppingCartService,
    private authenticationService: AuthenticationService ) { }

  ngOnInit() {
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  addTripToShoppingCart() {
    this.shoppingCartService.addTripToShoppingCart(this.trip);
  }

  deleteTripFromShoppingCart() {
    this.shoppingCartService.deleteTripFromShoppingCart(this.trip);
  }

  rateTrip(rating: number): void {
    this.trip.rating = rating;
  }

  removeTrip(): void {
    this.removeTripEmitter.emit(this.trip);
  }

  howManyLeft(): number {
    return this.trip.limit - (this.shoppingCartService.countTripInShoppingCart(this.trip));
  }

}
