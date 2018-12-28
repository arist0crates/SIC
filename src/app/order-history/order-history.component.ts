import { Component, OnInit } from '@angular/core';
import { Order } from "../orders/order.model";
import { OrderHistoryService } from '../order-history/order-history.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[];
  constructor(private orderHistoryService: OrderHistoryService,private authService: AuthService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    if(this.authService.isAuthenticated() == true){
      this.orderHistoryService.getOrders(this.authService.getCurrentUserUid()).subscribe(orders => this.orders = orders);
    }else{
      console.log("Utilizador não logado!!");
    }
  }

  getOrdersbyDate(dt_init:string,dt_end:string): void {
    if(this.authService.isAuthenticated() == true){
      this.orderHistoryService.getOrdersbyDate(this.authService.getCurrentUserUid(),dt_init,dt_end).subscribe(orders => this.orders = orders);
    }else{
      console.log("Utilizador não logado!!");
    }
  }

  getOrdersbyState(state:string): void {
    if(this.authService.isAuthenticated() == true){
      this.orderHistoryService.getOrderbyState(this.authService.getCurrentUserUid(),state).subscribe(orders => this.orders = orders);
    }else{
      console.log("Utilizador não logado!!");
    }
  }

}
