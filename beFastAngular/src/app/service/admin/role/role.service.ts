import { TODO_JPA_API_URL, API_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../../../admin/role/role.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(
    private http:HttpClient
  ) { }

  list() : Observable <any> {
    return this.http.get(`${API_URL}/admin/role`).pipe(
        map(
            data => data
        )
    );
  }

  getRoleByNome(selectedRole: string) : Observable <any> {
    return this.http.get(`${API_URL}/admin/role/${selectedRole}`).pipe(
      map(
          data => data
      )
    );
  }

}