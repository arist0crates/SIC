import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getLocaleExtraDayPeriods } from '@angular/common';
import { Order } from "../orders/order.model";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private url = 'http://sic-e.herokuapp.com/orders/orderHistory/'
  constructor(private http: HttpClient) { }

  getOrders(id:string): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + id);
  }

  getOrdersbyDate(id:string,data_init:string,data_end:string){
    return this.http.get<Order[]>(this.url + id + "/" + data_init + "/" + data_end);
  }

  getOrderbyState(id:string,state:string){
    return this.http.get<Order[]>(this.url + id + "/" + state);
  }

}

