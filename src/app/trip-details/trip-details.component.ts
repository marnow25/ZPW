import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../services/trip.service';
import { Trip } from '../models/trip';
import { AuthenticationService }  from '../services/authentication.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  trip: Trip;


  constructor(
    private tripService: TripService, 
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getTrip();
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  getTrip(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tripService.getTrip(id)
      .subscribe(trip => this.trip = trip);
  }
  updateTrip(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tripService.updateTrip(id, this.trip);
  }

}
