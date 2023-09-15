import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
import jwt_decode from 'jwt-decode';
import { GoogleTokenData } from 'src/app/interfaces/GoogleTokenData';
import { AdminService } from 'src/app/modules/admin/admin-service/admin.service';

declare var google: any; // ou importe de forma mais segura, dependendo das configurações do TypeScript
declare var FB: any;
declare var AppleID;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup | undefined;
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private socialAuthService: SocialAuthService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {
    StorageService.logout();

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.initializeGoogleOneTap();
  }

  initializeGoogleOneTap() {
    google.accounts.id.initialize({
      client_id:
        '1060584150882-3jpu5b3cqvgeakv7uhn36q8ubr0hqv8r.apps.googleusercontent.com',
      callback: this.handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } // customization attributes
    );
    google.accounts.id.prompt();
  }

  handleCredentialResponse = (response) => {
    const token = response.credential;

    try {
      var decodedToken: any = jwt_decode(token);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }

    var googleTokenData: GoogleTokenData = decodedToken;
    console.log(googleTokenData);

    this.authService
      .addUserGoogle(googleTokenData, token)
      .subscribe((response) => {
        console.log(
          'login component subscribe response addUserGoogle:',
          response
        );
        console.log(StorageService.isUserLoggedIn());

        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin/dashboard');
        } else if (StorageService.isUserLoggedIn()) {
          this.router.navigateByUrl('user/dashboard');
        } else {
          console.log('NAO TEM NINGUEM LOGADO');
        }
      }),
      (error) => {
        if (error.status == 406) {
          this.snackbar.open('User is not active', 'Close', {
            duration: 5000,
          });
        } else {
          this.snackbar.open('Bad credentials', 'Close', {
            duration: 5000,
          });
        }
      };

    // this.router.navigateByUrl("/user/dashboard")
  };

  login() {
    console.log('login component function login entrei', this.loginForm.value);
    this.authService
      .login(
        this.loginForm.get(['email'])!.value,
        this.loginForm.get(['password'])!.value
      )
      .subscribe((response) => {
        console.log('login component subscribe response:', response);
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin/dashboard');
        } else if (StorageService.isUserLoggedIn()) {
          this.router.navigateByUrl('user/dashboard');
        }
      }),
      (error) => {
        if (error.status == 406) {
          this.snackbar.open('User is not active', 'Close', {
            duration: 5000,
          });
        } else {
          this.snackbar.open('Bad credentials', 'Close', {
            duration: 5000,
          });
        }
      };
  }

  statusFacebook() {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  }

  async loginFacebook() {
    console.log('entrei loginFacebook');
    // FB.login(function(response){
    //   // handle the response
    // });

    FB.login(
      async (result: any) => {
        console.log(result.authResponse.accessToken);
        await this.authService
          .LoginWithFacebook(result.authResponse.accessToken)
          .subscribe((response) => {
            console.log(
              'login component subscribe response loginFacebook:',
              response
            );
            console.log(StorageService.isUserLoggedIn());

            if (StorageService.isAdminLoggedIn()) {
              this.router.navigateByUrl('admin/dashboard');
            } else if (StorageService.isUserLoggedIn()) {
              this.router.navigateByUrl('user/dashboard');
            } else {
              console.log('NAO TEM NINGUEM LOGADO');
            }
          });
      },
      { scope: 'email' }
    ),
      (error) => {
        if (error.status == 406) {
          this.snackbar.open('User is not active', 'Close', {
            duration: 5000,
          });
        } else {
          this.snackbar.open('Bad credentials', 'Close', {
            duration: 5000,
          });
        }
      };
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  public async apple() {
    try {
      console.log(AppleID)
      AppleID.auth.init({
        clientId: 'VRSignIn',
        scope: 'name email',
        redirectURI: 'https://angular-apple-signin.stackblitz.io/apple-callback',
        state: 'init',
        nonce: 'test',
        usePopup: true //or false defaults to false
      });
      const data = await AppleID.auth.signIn();
      console.log(this.parseJwt(data.authorization.id_token))

    } catch (error) {
      console.log(error)
      //handle error.
    }
  }

}

function statusChangeCallback(response) {
  // Called with the results from FB.getLoginStatus().
  console.log('statusChangeCallback');
  console.log(response); // The current login status of the person.
  if (response.status === 'connected') {
    // Logged into your webpage and Facebook.
    testAPI();
  } else {
    // Not logged into your webpage or we are unable to tell.
    document.getElementById('status').innerHTML =
      'Please log ' + 'into this webpage.';
  }
}

function testAPI() {
  // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information3.... ');

  FB.api('/me?fields=email', function (response) {
    console.log(response);
    console.log('Successful login for: ' + response.name);
  });
}
