import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trip } from '../models/trip';
import { Comment } from '../models/comment';
import { Order } from '../models/order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  private tripsCollection: AngularFirestoreCollection<Trip>;
  private usersOrdersCollection: AngularFirestoreCollection<Order>;
  private usersCommentsCollection: AngularFirestoreCollection<Comment>;
  private backendUrl = 'api/trips';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  trips: Observable<Trip[]>

  constructor( private http: HttpClient,
     private database: AngularFirestore,
     private router: Router,
     private authenticationService: AuthenticationService) {
    this.tripsCollection = this.database.collection<Trip>('trips');
    this.usersOrdersCollection = this.database.collection<Order>('usersOrders');
    this.usersCommentsCollection = this.database.collection<Comment>('usersComments');
   }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getTrips(): Observable<Trip[]> {
    // Firebase
    this.trips = this.tripsCollection.valueChanges({idField: 'id'});
    return this.trips;
    // API
    return this.http.get<Trip[]>(this.backendUrl)
                     .pipe(tap(_ => console.log('Fetched trips from API')),
                     catchError(this.handleError<Trip[]>('getTripsFromAPI', [])));
  }

  getTrip(id: any): Observable<Trip> {
    // Firebase
   const trip = this.database.doc<Trip>(`/trips/${id}`).snapshotChanges().pipe(map((action: any) =>  {
     const object = action.payload.data();
     object.id = action.payload.id;
     return object;
   }));
   return trip;
   // API
   const url = `${this.backendUrl}/${id}`;
   return this.http.get<Trip>(url)
                   .pipe(tap(_ => console.log('fetched item')),
                         catchError(this.handleError<Trip>('getTrip')));
 }

  addTrip(trip: Trip): Observable<Trip> {
    this.tripsCollection.add(trip);
    return of(trip);
    // API
    return this.http.post<Trip>(this.backendUrl, trip, this.httpOptions)
                    .pipe(tap(_ => console.log('added trip')),
                          catchError(this.handleError<Trip>('addTrip')));
  }

  updateTrip(id: any, data: any, confirm = true): any {
    // Firebase
   this.database.doc<Trip>(`/trips/${id}`).update(data).then(res => { if (confirm) {alert('Updated trip!'); } });
  }

  removeTrip(trip: Trip): Observable<Trip> {
    // Firebase
    this.database.doc<Trip>(`/trips/${trip.id}`).delete();
    return of(trip);
    // API
    const url = `${this.backendUrl}/${trip.id}`;
    return this.http.delete<Trip>(url, this.httpOptions)
                    .pipe(tap(_ => console.log('removed trip')),
                          catchError(this.handleError<Trip>('removeTrip')));
  }

  orderTrips(trips: Trip[]) {
    if (!this.authenticationService.getUser()) { this.router.navigate(['/log-in']);
    } else {

      // Update limits
      const uniqueIds = [...new Set(trips.map((trip: Trip) => trip.id))];
      uniqueIds.forEach(id => {
          const exampleTrip = trips.find((trip: Trip) => trip.id === id);
          const count = trips.filter((trip: Trip) => trip.id === id).length;
          this.updateTrip(id, {limit: exampleTrip.limit - count}, false);
      });

      // Save orders
      trips.forEach(trip  => {
         const order = {tripId: trip.id, userId: this.authenticationService.getUser().uid};
         this.usersOrdersCollection.add(order);
      });
  }
}
  

  /**
   * Get ordered items
   */
  getOrderedTrips() {
    const userId = this.authenticationService.getUserId();
    return this.database.collection<Order>('usersOrders',  ref => ref.where('userId', '==', userId )).valueChanges();
  }

  /**
   * Get comments for order
   */
  getComments(tripId: string) {
    return this.database.collection<Comment>('usersComments',  ref => ref.where('tripId', '==', tripId )).valueChanges();
  }

  /**
   * Add item to database.
   */
  addComment(comment: Comment) {
    // Firebase
    this.usersCommentsCollection.add(comment);
  }
}
