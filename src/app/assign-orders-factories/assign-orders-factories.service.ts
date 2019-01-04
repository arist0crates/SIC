import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderFactoryAssignment } from './order-factory-assignment.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AssignOrdersService {

  private url = 'http://sic-e.herokuapp.com/orderManager/assignOrders'
  constructor(private http: HttpClient) { }

  assignOrders() {
    return this
      .http
      .get(this.url)
      .toPromise()
      .then(res => <OrderFactoryAssignment[]>res)
      .then(data => { return data; });
      //return this.http.get<any>(this.url);
  }

  // assignOrders() : Observable<any> {
  //   return this.http.get<any>(this.url);
  // }
}

