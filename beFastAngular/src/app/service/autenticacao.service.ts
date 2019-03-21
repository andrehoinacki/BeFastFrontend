import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public getUserToken(){
    return localStorage.getItem('token');
  }

  public getUserRole(){
    return localStorage.getItem('role');
  }

  constructor() { }

  authenticate(username, password) {
    //console.log('before ' + this.isUserLoggedIn());
    if(username==="in28minutes" && password === 'dummy') {
      sessionStorage.setItem('authenticaterUser', username);
      //console.log('after ' + this.isUserLoggedIn());
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }

  isFuncionario() {
    let usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    return !(usuario !== null && (usuario.role === 'ROLE_ALUNO' || usuario.role === "ROLE_RESPONSAVEL"));
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
  }

  public saveUserLogin(result : any){
    localStorage.setItem('token', result.token.token);
    localStorage.setItem('role', result.role.nome);

    /**
     * Caso usuário seja um aluno
     */
    if(result.role.nome == 'ROLE_ALUNO'){
      localStorage.setItem('aluno_saldo', result.saldo);
    }
    
  }
}
