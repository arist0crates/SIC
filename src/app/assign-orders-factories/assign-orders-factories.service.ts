import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Config } from '../../../config';

import { OrderFactoryAssignment } from './order-factory-assignment.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AssignOrdersService {

  private url = Config.urlSiC_E + "/orderManager/assignOrders";
  constructor(private http: HttpClient) { }
  
  assignOrders() {
    return this
      .http
      .get(this.url)
      .toPromise()
      .then(res => <OrderFactoryAssignment[]>res)
      .then(data => { return data; });
  }
}

