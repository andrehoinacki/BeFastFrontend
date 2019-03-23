import { TODO_JPA_API_URL, API_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filial } from 'src/app/admin/filial/filial.model';

@Injectable({
  providedIn: 'root'
})
export class FilialService {
    constructor(
    private http:HttpClient
  ) { }

  list() : Observable <any> {
    return this.http.post(`${API_URL}/admin/filial/list`, "").pipe(
        map(
            data => data
        )
    );
}

salvar(data : Filial) : Observable <any> {
  if(data.id == null){
      return this.http.post(`${API_URL}/admin/filial/novo`,data).pipe(
          map(
              data => data
          )
      );
  }else{
      return this.http.put(`${API_URL}/admin/filial/edit`,data).pipe(
          map(
              data => data
          )
      );
  }
}

  get(id) : Observable <any> {
    return this.http.get(`${API_URL}/admin/filial/${id}`).pipe(
        map(
            data => data
        )
    );
  }
  
  deleteUsuario(id){
    return this.http.delete(`${API_URL}/admin/filial/${id}`);
  }
  
}