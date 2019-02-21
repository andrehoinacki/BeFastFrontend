import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private autenticacaoService : AutenticacaoService, 
    private router : Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const expectedRole = route.data.expectedRole;
    
    if(this.autenticacaoService.isUserLoggedIn()){
      if(this.verifyRoles( expectedRole )){
        return true;
      } else {
        this.router.navigate(['erro']);
        return false;
      }
      
    }else{
        this.router.navigate(['login']);
        return false;
    }


/*     if (this.autenticacaoService.isUserLoggedIn()) {
      return true;    
    }
    this.router.navigate(['login']);
    return false; */
  }

  verifyRoles( _expectedRole ){
    if(_expectedRole != null){
        return  _expectedRole.filter(role => role == this.autenticacaoService.getUserRole()).length > 0 ? true : false;
    }else{
        return true;
    }
}

}
