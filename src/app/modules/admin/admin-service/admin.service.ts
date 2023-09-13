import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addUser(userDto:any): Observable<any>{
    return this.http.post<[]>(BASIC_URL + "api/admin/user",userDto,{
      headers:this.createAuthorizationHeader(),
    });
  }

  getAllUsers():Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/users",
    {
      headers:this.createAuthorizationHeader(),
    })
  }

  deleteUser(userId:any):Observable<any>{
    return this.http.delete<[]>(BASIC_URL + `api/admin/user/${userId}`,
    {
      headers:this.createAuthorizationHeader(),
    })
  }

  getUserById(userId:number):Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/user/${userId}`,
    {
      headers:this.createAuthorizationHeader(),
    })
  }

  updateUser(userId:number,userDto:any): Observable<any>{
    console.log('admin server updateUser createAuthorizationHeader: ',this.createAuthorizationHeader());

    return this.http.put<[]>(BASIC_URL + `api/admin/user/${userId}`,userDto,{
      headers:this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader():HttpHeaders{
    let authHeader:HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',"Bearer " + StorageService.getToken()
    );
  }
}
