import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor( private authenticationService: AuthenticationService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
   return this.authenticationService.authState$.pipe(map(stateIn => {
     if (stateIn === null) { return true; }
     this.router.navigate(['']);
     return false;
   }));
  }
}