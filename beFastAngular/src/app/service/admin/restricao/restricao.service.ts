import { TODO_JPA_API_URL, API_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restricao } from '../../../admin/restricao/restricao.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestricaoService {


  constructor(
    private http:HttpClient
  ) { }

  list() : Observable <any> {
    return this.http.get(`${API_URL}/admin/restricao`).pipe(
        map(
            data => data
        )
    );
  }

  getRestricaoByNome(selectedRestricao: string) : Observable <any> {
    return this.http.get(`${API_URL}/admin/restricao/${selectedRestricao}`).pipe(
      map(
          data => data
      )
    );
  }

}