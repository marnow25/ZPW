import { Component, OnInit, Input } from '@angular/core';
import { TripService } from '../services/trip.service'
import { Comment } from 'src/app/models/comment';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.css']
})
export class CommentaryComponent implements OnInit {
  comment: string;
  comments: Comment[];
  canComment: boolean;

  @Input() trip: Trip;
  constructor(
    private authenticationService: AuthenticationService, 
    private tripService: TripService

  ) { }

  ngOnInit() {

  this.tripService.getComments(this.trip.id).subscribe((comments: Comment[]) => {
    this.comments = comments;
  });

  this.tripService.getOrderedTrips().subscribe((orders: any) => {
     orders = orders.filter((order: Order) => order.tripId === this.trip.id);
     const usersIds = [...new Set(orders.map((order: any) => order.userId))];
     this.canComment = usersIds.includes(this.authenticationService.getUserId());
  });
 }

 addComment() {
   if (!this.comment) { return; }
   const comment = {text: this.comment, tripId: this.trip.id} as Comment;
   this.tripService.addComment(comment);
   this.comment = '';
 }

}
