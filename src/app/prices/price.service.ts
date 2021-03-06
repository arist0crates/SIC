import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ProductPrice } from '../products/product-price/productprice.model';
import { Config } from 'config';
@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private url = Config.urlSiC_GC;
  constructor(public http: HttpClient, private authService: AuthService) { }

  getProductPrice(productId: number) {
    return this
      .http
      //.get('https://localhost:5001/api/ProductPrice/ByProduct/' + productId)
      .get(this.url+'/api/ProductPrice/ByProduct/' + productId)
      .toPromise()
      .then(res => <ProductPrice[]>res)
      .then(data => { return data; });
  }
}
