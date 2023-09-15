import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';

declare const FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste-security-app';

  isAdminLoggedIn : boolean;
  isUserLoggedIn: boolean;

  constructor(
    private router:Router
  ){}

  ngOnInit(){
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.updateUserLoggedStatus();
      }
    })
  }

  private updateUserLoggedStatus(): void {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isUserLoggedIn = StorageService.isUserLoggedIn();
  }

  logout(){
    const user = StorageService.getUser();
    console.log(user)
    StorageService.logout();
    if(user.source=='FACEBOOK'){
      FB.logout(function(response) {
        // user is now logged out
      });
    }
    this.router.navigateByUrl("/login")
  }
}
