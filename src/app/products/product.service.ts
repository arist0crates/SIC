import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Category } from '../categories/category.model';
import { AuthService } from '../auth/auth.service';
import { MaterialFinish } from '../materialfinishes/materialfinish.model';


@Injectable()
export class ProductService {
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor(private slService: ShoppingListService, public http: HttpClient, private authService: AuthService) {}

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {
    let token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '+ token,
        'Accept': 'application/json'
      })
    };
    console.log(token.toString());
    return this
      .http
      .get('https://sicgc.azurewebsites.net/api/Product', httpOptions)
      .toPromise()
      .then(res => <Product[]>res)
      .then(data => {return data; });
  }

  getProduct(index: number) {
    let token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer '+ token,
        'Accept': 'application/json'
      })
    };
    return this
      .http
      .get('https://sicgc.azurewebsites.net/api/Product/'+ index, httpOptions)
      .toPromise()
      .then(res => <Product>res)
      .then(data => {return data; });
  }

  addProductToShoppingList(product: Product) {
    this.slService.addProduct(product);
  }

  addProduct(product: Product) {
    this.products.push(product);
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
  getCategory(){
    return this
      .http
      .get('https://sicgc.azurewebsites.net/api/Category')
      .toPromise()
      .then(res => <Category[]>res)
      .then(data => { return data; });
  }

  getMaterialFinish() {
    return this
      .http
      .get('https://sicgc.azurewebsites.net/api/MaterialFinish')
      .toPromise()
      .then(res => <MaterialFinish[]>res)
      .then(data => { return data; });
  }

}
