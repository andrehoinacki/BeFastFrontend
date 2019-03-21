import { TODO_JPA_API_URL, API_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../../admin/usuario/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    constructor(
    private http:HttpClient
  ) { }

  list(filter : any) : Observable <any> {
    return this.http.post(`${API_URL}/admin/usuario/list`,filter).pipe(
        map(
            data => data
        )
    );
}

salvar(data : Usuario) : Observable <any> {
  if(data.id == null){
      return this.http.post(`${API_URL}/admin/usuario/novo`,data).pipe(
          map(
              data => data
          )
      );
  }else{
      return this.http.put(`${API_URL}/admin/usuario/edit`,data).pipe(
          map(
              data => data
          )
      );
  }
}

  get(id) : Observable <any> {
    return this.http.get(`${API_URL}/admin/usuario/${id}`).pipe(
        map(
            data => data
        )
    );
  }

  getByUsername(username) : Observable <any> {
    return this.http.get(`${API_URL}/admin/usuario/byusername/${username}`).pipe(
        map(
            data => data
        )
    );
  }

  getByMatricula(matricula) : Observable <any> {
    return this.http.get(`${API_URL}/admin/usuario/bymatricula/${matricula}`).pipe(
        map(
            data => data
        )
    );
  }

  deleteUsuario(id){
    return this.http.delete(`${API_URL}/admin/usuario/${id}`);
  }

  retrieveUsuario(username, id){
    return this.http.get<Usuario>(`${TODO_JPA_API_URL}/users/${username}/usuario/${id}`);
  }

  listSaldoByUsuario(filtro: any): Observable <any> {
    return this.http.post(`${API_URL}/responsavel/saldo/list`,filtro).pipe(
      map(
          data => data
      )
    );
  }
}