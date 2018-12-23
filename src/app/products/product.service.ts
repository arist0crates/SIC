import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class ProductService {
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor(private slService: ShoppingListService, public http: HttpClient) {}

  setRecipes(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }

  getProducts() {

    return this
      .http
      .get('https://localhost:5001/api/Product')
      .toPromise()
      .then(res => <Product[]>res)
      .then(data => {return data; });
  }

  getProduct(index: number) {
    return this
      .http
      .get('https://localhost:5001/api/Product/'+ index)
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
}
