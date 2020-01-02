import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-in-order',
  templateUrl: './trip-in-order.component.html',
  styleUrls: ['./trip-in-order.component.css']
})
export class TripInOrderComponent implements OnInit {
  @Input() trip: Trip;

  constructor() { }

  ngOnInit() {
  }

}
