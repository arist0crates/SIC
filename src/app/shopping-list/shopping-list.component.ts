import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

import { ShoppingListService } from './shopping-list.service';
import { Product } from '../products/product.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription;

  @ViewChild('orderForm') orderForm: NgForm;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.products = this.slService.getProducts();
    this.subscription = this.slService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  onOrder() {
    console.log('Cheguei!!!!!!!!!');
    this.slService.onOrder(this.orderForm);
    this.ngOnInit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
