import { Subject } from 'rxjs/Subject';
import { Product } from '../products/product.model';
import { Order } from '../orders/order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { City } from '../cities/city.model';
import { Location } from "../locations/location.model";
import { DeliveryAddress } from "../deliveryAddresses/deliveryaddress.model";
import { AuthService } from '../auth/auth.service';
import { Config } from 'config';
import { MaterialFinish } from '../materialfinishes/materialfinish.model';

@Injectable()
export class ShoppingListService {
  productsChanged = new Subject<Product[]>();
  startedEditing = new Subject<number>();
  private products: Product[] = [];
  private order: Order = new Order();
  private newMaterialFinishes : MaterialFinish[];
  private productReview;

  private url = Config.urlSiC_E + '/orders';

  constructor(public http: HttpClient, private toastr: ToastrService, private authService: AuthService) { }

  getProducts() {
    return this.products.slice();
  }

  getProductsWithOneMaterial(){
    for(var i=0;i<this.products.length;i++){
      this.newMaterialFinishes = [];
      this.newMaterialFinishes.unshift(this.products[i].possibleMaterialFinishes[0]);
      this.products[i].possibleMaterialFinishes = this.newMaterialFinishes;
    }
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
    let token = this.authService.getToken();
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '+ token,
        'Accept': 'application/json'
      })
    };
    console.log('Cheguei2!!!!!!!!');
    console.log('Cheguei3!!!!!!!!' + orderForm.value);
    let location = new Location(orderForm.controls.latitude.value, orderForm.controls.longitude.value);
    let city = new City(orderForm.controls.city.value, location);
    let deliveryAddress = new DeliveryAddress(city);
    console.log(this.order);
    this.order.deliveryAddress = deliveryAddress;
    this.order.orderItems = [...this.getProductsWithOneMaterial()];
    this.order.datePlaced = new Date();
    var useruid =  this.authService.getCurrentUserUid;
    console.log('USERUID:' + useruid);
    this.order.customer = useruid();
    console.log(this.order.orderItems);
    if (this.order.orderItems.length > 0) {
      this.http.post(this.url, this.order, httpOptions)
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

  setProductForPreview(product : Product){
    this.productReview = product;
  }

  getProductForPreview(){
    return this.productReview;
  }

}
