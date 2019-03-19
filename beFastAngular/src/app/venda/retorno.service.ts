import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RetornoService {

  constructor(
    private http:HttpClient
  ) { }

  atualizarRetorno() : Observable <any> {        
    return this.http.get(`${API_URL}/venda/boleto/retorno`, {            
    }).pipe(      
      map(          
          data => data          
      )
    );
  }

}
