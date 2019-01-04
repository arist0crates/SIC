import { Injectable } from '@angular/core';
import { Product } from '../products/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Catalog } from './catalog.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private products: Product[] = [];
  private catalogproducts: Product[] = [];
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



  postCatalog(newCatalog: Catalog) {
    let token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      })
    };

    return this
      .http
      //.post('https://localhost:5001/api/Collection', JSON.stringify(newCatalog),
        .post('https://sicgc.azurewebsites.net/api/Catalog', JSON.stringify(newCatalog),
        httpOptions

      ).subscribe(data => {
        console.log(data);
      });
  }
}


