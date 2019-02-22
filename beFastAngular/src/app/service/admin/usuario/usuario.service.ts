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
      return this.http.put(`${API_URL}/admin/usuario/edit`+data.id,data).pipe(
          map(
              data => data
          )
      );
  }
}

get(id) : Observable <any> {
  return this.http.get("/admin/usuario/"+id).pipe(
      map(
          data => data
      )
  );
}

/*   list(filter : any) {
    console.log();
    return this.http.get("/admin/usuario/list",filter);
  } */

  retrieveAllTodos(username) {
    return this.http.get<Usuario[]>(`${TODO_JPA_API_URL}/users/${username}/usuario`);
    //console.log("Execute Hello World Bean Service")
  }

  deleteUsuario(username, id){
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/usuario/${id}`);
  }

  retrieveUsuario(username, id){
    return this.http.get<Usuario>(`${TODO_JPA_API_URL}/users/${username}/usuario/${id}`);
  }

  updateUsuario(username, id, todo){
    return this.http.put(
          `${TODO_JPA_API_URL}/users/${username}/usuario/${id}`
                , todo);
  }

  createUsuario(username, usuario){
    return this.http.post(
              `${TODO_JPA_API_URL}/users/${username}/todos`
                , usuario);
  }

}