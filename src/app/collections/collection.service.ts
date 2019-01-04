import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Product } from '../products/product.model';
import { Collection, CollectionDTO } from './collection.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private products: Product[] = [];
  private collectionproducts: Product[] = [];

  constructor(public http: HttpClient, private authService: AuthService) { }

  setProducts(products: Product[]) {
    this.products = products;
  }

  getProducts() {
    let token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      })
    };

    return this
      .http
      .get('https://sicgc.azurewebsites.net/api/Product', httpOptions)
      .toPromise()
      .then(res => <Product[]>res)
      .then(data => { return data; });
  }

  getProduct(index: number) {
    let token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      })
    };
    return this
      .http
      .get('https://sicgc.azurewebsites.net/api/Product/' + index, httpOptions)
      .toPromise()
      .then(res => <Product>res)
      .then(data => { return data; });
  }

  postCollection(newCollection: CollectionDTO) {
    let token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      })
    };

    return this
      .http
      //.post('https://localhost:5001/api/Collection', JSON.stringify(newCollection),
      .post('https://sicgc.azurewebsites.net/api/Collection', JSON.stringify(newCollection),
        httpOptions

      ).subscribe(data => {
        console.log(data);
      });
  }
}
