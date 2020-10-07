import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const loggedIn = this.authService.isLoggedIn();
      if (loggedIn) {
        return true;
      }

      this.router.navigate(['login']);
      return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state:
    RouterStateSnapshot): boolean |
    Observable<boolean> | Promise<boolean> {
       return this.canActivate(route, state);
    }
}
