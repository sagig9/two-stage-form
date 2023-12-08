import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the route is accessing the step-two component
    if (state.url.includes('/step-two') && document.referrer.includes('/step-one')) {
      return true; // Allow navigation to step-two if coming from step-one
    }

    // Redirect to step-one for all other cases
    this.router.navigate(['/step-one']);
    return false;
  }


}
