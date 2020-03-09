import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from "./services/api.service";


@Injectable({
  providedIn: 'root'
})
export class Auth implements CanActivate {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token') == null) {
      window.alert('دسترسی شما تایید نشده است. لطفا وارد شوید.');
      this.router.navigate(['/']);
    }
    return true;
  }

}
