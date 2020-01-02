import { Component, OnInit } from '@angular/core';
import {TripService} from '../services/trip.service';
import { Trip } from '../models/trip';
import {Order} from 'src/app/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderedTrips = [];
  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.getOrderedTrips();
   }
 
   getOrderedTrips() {
    this.tripService.getOrderedTrips().subscribe((orders: Order[]) => {
       const uniqueIds = [...new Set(orders.map((order: Order) => order.tripId))];
       uniqueIds.forEach(id => {
           const count = orders.filter((order: Order) => order.tripId === id).length;
           this.tripService.getTrip(id).subscribe(trip => this.orderedTrips.push(...Array(count).fill(trip)));
       });
     });
   }
}
