import { Component, OnInit } from '@angular/core';
import { Order } from "../orders/order.model";
import { OrderHistoryService } from '../order-history/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[];
  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit() {
  }

  getOrders(): void {
    this.orderHistoryService.getOrders().subscribe(orders => this.orders = orders);
  }
}
