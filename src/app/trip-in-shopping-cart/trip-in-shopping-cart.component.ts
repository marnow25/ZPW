import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-in-shopping-cart',
  templateUrl: './trip-in-shopping-cart.component.html',
  styleUrls: ['./trip-in-shopping-cart.component.css']
})
export class TripInShoppingCartComponent {

  @Input() trip: Trip;
  @Output() removeTripEmitter = new EventEmitter<Trip>();


  constructor(private shoppingCartService: ShoppingCartService) { }

  addTripToShoppingCart(): void {
    this.shoppingCartService.addTripToShoppingCart(this.trip);
  }
  removeTripFromShoppingCart(): void {
    this.shoppingCartService.deleteTripFromShoppingCart(this.trip);
  }

  howManyLeft(): number {
    return this.trip.limit - (this.shoppingCartService.countTripInShoppingCart(this.trip));
  }

}
