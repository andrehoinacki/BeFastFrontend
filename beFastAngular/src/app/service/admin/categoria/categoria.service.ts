import { TODO_JPA_API_URL, API_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../../admin/categoria/categoria.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  constructor(
    private http:HttpClient
  ) { }

  list() : Observable <any> {
    return this.http.get(`${API_URL}/admin/categoria`).pipe(
        map(
            data => data
        )
    );
  }

  getCategoriaByNome(selectedCategoria: string) : Observable <any> {
    return this.http.get(`${API_URL}/admin/categoria/${selectedCategoria}`).pipe(
      map(
          data => data
      )
    );
  }

}