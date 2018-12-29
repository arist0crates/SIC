import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class CalcCircuitService {

  private url = 'http://sic-e.herokuapp.com/orderManager/calcCircuit'
  constructor(private http: HttpClient) { }

  calcCircuit(): Observable<any> {
    return this.http.get<any>(this.url);
  }

}

