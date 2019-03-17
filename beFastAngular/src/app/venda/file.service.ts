import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  downloadFile(data) : Observable <any> {    
    const REQUEST_PARAMS = new HttpParams().set('fileName', data.fileName);    
    return this.http.get(`${API_URL}/download`, {
      params: REQUEST_PARAMS,
      responseType: 'arraybuffer'
    })
  }

  download(matricula, valorCredito) : Observable <any> {
    const REQUEST_PARAMS = new HttpParams().set('filename', 'aux').set('matricula', matricula);        
    return this.http.get(`${API_URL}/venda/download/${valorCredito}`, {
    params: REQUEST_PARAMS  ,
    responseType: 'arraybuffer'
    }).pipe(      
        map(          
            data => data,            
            console.log(REQUEST_PARAMS.get('filename'))
        )
    );
  }

}