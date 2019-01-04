import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PriceService } from '../price.service';
import { Product } from 'src/app/products/product.model';
import { ProductPrice } from 'src/app/products/product-price/productprice.model';
@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.css']
})
export class PriceHistoryComponent implements OnInit {
  id : number;
  productPrices : ProductPrice[];
  constructor(private route: ActivatedRoute,
    private priceService: PriceService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );
    this.priceService.getProductPrice(this.id)
      .then((productPrice) => {
        this.productPrices = productPrice;
        console.log(this.productPrices);
      });
  }
}
