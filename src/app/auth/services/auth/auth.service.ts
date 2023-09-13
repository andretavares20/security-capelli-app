import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { GoogleTokenData } from 'src/app/interfaces/GoogleTokenData';

const BASIC_URL = ['http://localhost:8080/']
export const AUTH_HEADER = 'authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private storage: StorageService) { }

  login(email: string, password: string): Observable<any> {

    return this.http.post(BASIC_URL + 'authenticate', {
      email,
      password
    }, { observe: 'response' })
      .pipe(
        tap(__ => this.log("User Authentication")),
        map((res: HttpResponse<any>) => {
          console.log('auth service map entrei')
          this.storage.saveUser(res.body);
          const tokenLength = res.headers.get(AUTH_HEADER).length;
          const bearerToken = res.headers.get(AUTH_HEADER).substring(7, tokenLength);
          this.storage.saveToken(bearerToken);
          return res
        }
        ))
  }

  addUserGoogle(userGoogleDto: GoogleTokenData,token:any) {
    console.log('entrei addUserGoogle')
    return this.http.post<GoogleTokenData>(BASIC_URL + "api/admin/user/google", userGoogleDto, { observe: 'response' })
      .pipe(
        tap(__ => this.log("User Authentication")),
        map((res: HttpResponse<GoogleTokenData>) => {
          console.log('auth service map entrei addUserGoogle')
          console.log('RES.BODY: ',res.body);
          this.storage.saveUser(res.body);
          this.storage.saveToken(token);
          return res.body;
        }
        ));
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization', "Bearer " + StorageService.getToken()
    );
  }

  log(message: string) {
    console.log(message);
  }

  LoginWithFacebook(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(BASIC_URL + "LoginWithFacebook", JSON.stringify(credentials), { headers: header})
    .pipe(
      tap(__ => this.log("User Authentication")),
      map((res: HttpResponse<any>) => {
        console.log('auth service map entrei LoginWithFacebook')
        console.log('RES.BODY: ',res);
        this.storage.saveUser(res);
        this.storage.saveToken(credentials);
        return res;
      }
      ));;
  }
}
