import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from "../../services/storage/storage.service";

@Injectable({
  providedIn: "root"
})

export class noAuthGuard implements CanActivate {

  constructor(
    private router:Router
  ){}

  canActivate(
    next:ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(StorageService.hasToken() && StorageService.isUserLoggedIn()){

      this.router.navigateByUrl("/user/dashboard");
      return false;

    }else if(StorageService.hasToken() && StorageService.isAdminLoggedIn()){

      this.router.navigateByUrl("/admin/dashboard");
      return false;

    }
    return true;
  }

}
