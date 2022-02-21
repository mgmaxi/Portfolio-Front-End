import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  realRole: string = '';

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRoles = route.data['expectedRole'];

    const roles = this.tokenService.getAuthorities();

    this.realRole = 'user';
    roles.forEach((role) => {
      if (role === 'ROLE_ADMIN') {
        this.realRole = 'admin';
      }
    });
    if (
      !this.tokenService.getToken() ||
      expectedRoles.indexOf(this.realRole) === -1
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
