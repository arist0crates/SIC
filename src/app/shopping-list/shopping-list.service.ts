import { Subject } from 'rxjs/Subject';
import { Product } from '../products/product.model';
import { Order } from '../orders/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { City } from '../cities/city.model';
import { Location } from "../locations/location.model";
import { DeliveryAddress } from "../deliveryAddresses/deliveryaddress.model";

@Injectable()
export class ShoppingListService {
  productsChanged = new Subject<Product[]>();
  startedEditing = new Subject<number>();
  private products: Product[] = [];
  private order: Order = new Order();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient, private toastr: ToastrService) { }

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    console.log('looooooool:' + this.products[index].productId);
    return this.products[index];
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  addProducts(products: Product[]) {
    for (let product of products) {
      this.addProduct(product);
    }
    this.products.push(...products);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }

  onOrder(orderForm: NgForm) {
    console.log('Cheguei2!!!!!!!!');
    console.log('Cheguei3!!!!!!!!' + orderForm.value);
    let location = new Location(orderForm.controls.latitude.value, orderForm.controls.longitude.value);
    let city = new City(orderForm.controls.city.value, location);
    let deliveryAddress = new DeliveryAddress(city);
    console.log(this.order);
    this.order.deliveryAddress = deliveryAddress;
    this.order.orderItems = [...this.getProducts()];
    console.log(this.order.orderItems);
    if (this.order.orderItems.length > 0) {
      this.http.post('https://sic-e.herokuapp.com/orders', this.order)
        .toPromise()
        .catch();
      this.showSuccess();
    }else{
      this.showFailure();
    }

  }

  showSuccess() {
    this.toastr.success('Order Created!!!');
  }

  showFailure() {
    this.toastr.success('Order needs to have Products!!!');
  }

}
