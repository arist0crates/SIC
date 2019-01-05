import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class CalcCircuitService {

  private url = Config.urlSiC_E + '/orderManager/calcCircuit';
  constructor(private http: HttpClient) { }

  calcCircuit(): Observable<any> {
    return this.http.get<any>(this.url);
  }

}

