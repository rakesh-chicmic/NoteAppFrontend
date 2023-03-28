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
  if ( path?.includes('home')||path?.includes('notes')|| path?.includes('trash') || path?.includes('archieve') || path?.includes('change') && !this.service.isLoggedIn()) {

    return true;
  }
  if ((path?.includes('sign-in') || path?.includes('login')) && !this.service.isLoggedIn()) {

    this.router.navigate(['notes']);
    return false;
  }
  if ((path?.includes('sign-in') || path?.includes('login')) && this.service.isLoggedIn()) {

    return true;

  }

  if (path?.includes('notes') && !this.service.isLoggedIn()) {
    this.router.navigate(['/login']);
    return false;
  }
  this.router.navigateByUrl('/login')
  return false;
}
  
}
