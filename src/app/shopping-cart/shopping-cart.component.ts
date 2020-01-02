import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent{

  constructor(private shoppingCartService: ShoppingCartService) { }


  getUniqueTripsInShoppingCart(): Set<Trip> {
    return this.shoppingCartService.getUniqueTripsInShoppingCart();
  }

  countTripsInShoppingCart(): number {
    return this.shoppingCartService.countTripsInShoppingCart();
  }
  orderTrips() {
    return this.shoppingCartService.orderTrips();
  }

}
