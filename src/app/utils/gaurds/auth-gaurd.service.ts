import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router , private service: RegisterService){}

  canActivate(route: ActivatedRouteSnapshot):boolean{
    const { routeConfig } = route;
    const { path } = routeConfig as Route;
  if (path?.includes('main/notes')|| path?.includes('main/trash') || path?.includes('main/archieve') || path?.includes('auth/change') && !this.service.isLoggedIn()) {

    return true;
  }
  if ((path?.includes('auth/sign-in') || path?.includes('auth/login')) && !this.service.isLoggedIn()) {

    this.router.navigate(['main/notes']);
    return false;
  }
  if ((path?.includes('auth/sign-in') || path?.includes('auth/login')) && this.service.isLoggedIn()) {

    return true;

  }

  if (path?.includes('main/notes') && !this.service.isLoggedIn()) {
    this.router.navigate(['auth/login']);
    return false;
  }
  this.router.navigateByUrl('/auth/login')
  return false;
}
  
}
