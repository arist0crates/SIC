import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(() => {
        this.productService.getProducts()
          .then((products) => {
            this.products = products;
            console.log(this.products);
          })
      })


    this.subscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );

    this.productService.getProducts()
      .then((products) => {
        this.products = products;
        console.log("lalalalal" + this.products);
      });
  }

  onNewProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onNewCollection() {
    this.router.navigate(['newCollection'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
