import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  /*canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
        
    const user: User = this.authService.user$.getValue();
    if (user.username === '') {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }*/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("usao")
    const user: User = this.authService.user$.getValue();
    const id = route.params['id']; // Uzimanje ID parametra iz rute
    console.log(id)
    console.log(user)
    // Provjeravanje autentifikacije i ID-ja
    if (user.username === '') {
      this.router.navigate(['login']);
      return false;
    }else if(user.id != id){
      this.router.navigate(['userprofile/' + user.id])
      return false;
    }
    return true;
  }
}
