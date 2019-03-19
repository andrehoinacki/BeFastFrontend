import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venda } from 'src/app/venda/venda-produto/venda.model';
import { Observable } from 'rxjs';
import { TODO_JPA_API_URL, API_URL } from 'src/app/app.constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(
    private http:HttpClient
  ) { }

  salvar(data : Venda) : Observable <any> {  
    console.log(data.total);
    return this.http.post(`${API_URL}/venda/novo`,data).pipe(
        map(
            data => data
        )
    );
  }
    
}
