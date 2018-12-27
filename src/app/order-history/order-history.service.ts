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

  private url = 'http://localhost:8080/orders/orderHistory/'
  constructor(private http: HttpClient) { }

  getOrders(id:number): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + id);
  }

  getOrdersbyDate(id:number,data_init:string,data_end:string){
    return this.http.get<Order[]>(this.url + id + "/" + data_init + "/" + data_end);
  }

  getOrderbyState(id:number,state:string){
    return this.http.get<Order[]>(this.url + id + "/" + state);
  }

}

