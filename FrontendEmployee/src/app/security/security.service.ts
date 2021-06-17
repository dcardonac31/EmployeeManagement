import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { authenticationResponse, userCredential } from './security';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = environment.apiUrl + 'accounts'
  private readonly tokenKey = 'token';
  private readonly tokenExpiration  = "token-expiration";
  private readonly rolField = 'role';

  isLogin(): boolean{

    const token = localStorage.getItem(this.tokenKey);

    if(!token){
      return false;
    }

    const expiration = localStorage.getItem(this.tokenExpiration);
    const expirationDate = new Date(expiration);

    if(expirationDate <= new Date()){
      this.logout();
      return false;
    }

    
    return true;
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpiration);
  }

  getRol(): string{
    return this.getJwtField(this.rolField);
  }

  getJwtField(field: string): string{
    const token = localStorage.getItem(this.tokenKey);
    if(!token){return '';}
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  register(credentials: userCredential): Observable<authenticationResponse>{
    return this.httpClient.post<authenticationResponse>(this.apiUrl + '/create', credentials);
  }

  login(credentials: userCredential): Observable<authenticationResponse>{
    return this.httpClient.post<authenticationResponse>(this.apiUrl + '/login', credentials);
  }

  saveTokenLocalStorage(authenticationResponse: authenticationResponse){
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(this.tokenExpiration, authenticationResponse.expiration.toString());
  }

  getToken(){
    return localStorage.getItem(this.tokenKey);
  }
}
