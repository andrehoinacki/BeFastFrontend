import { API_URL } from '../../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecebiveisService {

  constructor(
    private http:HttpClient
  ) { }

  list(filter : any) : Observable <any> {
    return this.http.post(`${API_URL}/relatorio/recebiveis/list`,filter).pipe(
        map(
            data => data
        )
    );
  }
}