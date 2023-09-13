import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from "../../services/storage/storage.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})

export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('canActivate entrei')
    if (StorageService.isAdminLoggedIn()) {

      this.router.navigateByUrl("/admin/dashboard");
      this.snackbar.open("You dont have access to this page", "Close", { duration: 5000 })
      console.log('canActivate isAdminLoggedIn')
      return false;

    } else if (!StorageService.hasToken()) {
      console.log('canActivate !hasToken')
      StorageService.logout();
      this.router.navigateByUrl("/login");
      
      this.snackbar.open("You are not loggedIn", "Close", { duration: 5000 })
      return false;

    }
    return true;
  }

}
