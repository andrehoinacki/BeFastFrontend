import { TODO_JPA_API_URL, API_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../../../admin/produto/produto.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http:HttpClient
  ) { }

  list(filter : any) : Observable <any> {
    return this.http.post(`${API_URL}/admin/produto/list`,filter).pipe(
        map(
            data => data
        )
    );
}

salvar(data : Produto) : Observable <any> {
  if(data.id == null){
      return this.http.post(`${API_URL}/admin/produto/novo`,data).pipe(
          map(
              data => data
          )
      );
  }else{
      return this.http.put(`${API_URL}/admin/produto/edit`,data).pipe(
          map(
              data => data
          )
      );
  }
}

get(id) : Observable <any> {
  return this.http.get(`${API_URL}/admin/produto/${id}`).pipe(
      map(
          data => data
      )
  );
}

getByCodigo(codigo) : Observable <any> {
  return this.http.get(`${API_URL}/admin/produto/bycodigo/${codigo}`).pipe(
      map(
          data => data
      )
  );
}

  deleteProduto(id){
    return this.http.delete(`${API_URL}/admin/produto/${id}`);
  }

}