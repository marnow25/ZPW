import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// own imports

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { TripComponent } from './trip/trip.component';
import { TripsComponent } from './trips/trips.component';
import { InMemoryDataService } from './services/in-memory-data.service';
import { TripDestinationPipe } from './filters/trip-destination.pipe';
import { TripEndDatePipe } from './filters/trip-end-date.pipe';
import { TripMaxPricePipe } from './filters/trip-max-price.pipe';
import { TripMinPricePipe } from './filters/trip-min-price.pipe';
import { TripMinRatingPipe } from './filters/trip-min-rating.pipe';
import { TripStartDatePipe } from './filters/trip-start-date.pipe';
import { NewTripComponent } from './new-trip/new-trip.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TripInShoppingCartComponent } from './trip-in-shopping-cart/trip-in-shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { TripInOrderComponent } from './trip-in-order/trip-in-order.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { CommentaryComponent } from './commentary/commentary.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    TripComponent,
    TripsComponent,
    TripDestinationPipe,
    TripEndDatePipe,
    TripMaxPricePipe,
    TripMinPricePipe,
    TripMinRatingPipe,
    TripStartDatePipe,
    NewTripComponent,
    TripDetailsComponent,
    ShoppingCartComponent,
    TripInShoppingCartComponent,
    OrdersComponent,
    TripInOrderComponent,
    SignInComponent,
    LogInComponent,
    CommentaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, // do obsługi autentykacji
    AngularFirestoreModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
