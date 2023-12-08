import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const currentPathName = window.location.pathname;

    if (currentPathName === '/' || currentPathName === '/step-one' ) {
      return true;
    }

    this.router.navigate(['/step-one']);
    return false;
  }


}
