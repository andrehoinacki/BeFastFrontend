import { API_URL } from './../app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAutenticacaoService {

  constructor(private http : HttpClient) { }

  public getUserToken(){
    return localStorage.getItem('token');
  }

  public getUserRole(){
    return localStorage.getItem('role');
  }

  executeJWTAuthenticationService(username, password) {
    
    return this.http.post<any>(
      `${API_URL}/authenticate`,{
        username,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            this.saveUserLogin(data);
            return data;
          }
        )
      );
    //console.log("Execute Hello World Bean Service")
  }


  executeAuthenticationService(username, password) {
    
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
        Authorization: basicAuthHeaderString
      })

    return this.http.get<AuthenticationBean>(
      `${API_URL}/basicauth`,
      {headers}).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
      );
    //console.log("Execute Hello World Bean Service")
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
  }

  public saveUserLogin(result : any){
    localStorage.setItem('token', result.token);
    localStorage.setItem('role', result.role);

    /**
     * Caso usuário seja um aluno
     */
    if(result.role.nome == 'ROLE_ALUNO'){
      localStorage.setItem('aluno_saldo', result.saldo);
    }
    
  }
  
}

export class AuthenticationBean{
  constructor(public message:string) { }
}
