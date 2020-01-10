import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { TripService } from '../services/trip.service';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  trips: Trip[];
  showForm: boolean;

  destinationFilter: string;
  startDateFilter: string;
  endDateFilter: string;
  minimumPriceFilter: string;
  maximumPriceFilter: string;
  minimumRateFilter: string;

  constructor( private shoppingCartService: ShoppingCartService, 
    private authenticationService: AuthenticationService, 
    private tripService: TripService) { }

  ngOnInit() {
    this.getTrips();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe(trips => this.trips = trips);
  }

  addTrip(trip: Trip) {
    this.tripService.addTrip(trip).subscribe(newTrip => this.trips.push(newTrip));
  }

  removeTrip(trip: Trip) {
    if (confirm('Are you sure you want to delete this trip?')) {
     this.tripService.removeTrip(trip).subscribe(res => { this.trips.splice( this.trips.indexOf(trip), 1); });
    }
  }

  countTripsInShoppingCart(): number {
    return this.shoppingCartService.countTripsInShoppingCart();
  }

  isTripSpecialLowestPrice(trip: Trip): boolean {
    const lowestPriceTrip = this.trips.reduce((a, b) => a.price < b.price ? a : b);
    return trip === lowestPriceTrip;
  }
  isTripSpecialHighestPrice(trip: Trip): boolean {
    const highestPriceTrip = this.trips.reduce((a, b) => a.price > b.price ? a : b);
    return trip === highestPriceTrip;
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
   }
}
