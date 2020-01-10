import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './authentication.guard';

const routes: Routes = [
  { path: '', component: TripsComponent },
  { path: 'trip/:id', component: TripDetailsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  { path : 'sign-up', component: SignInComponent},
  { path : 'log-in', component: LogInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
