import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { HttpParams } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';
import { ProductPrice } from 'src/app/prices/productprice.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  subproducts: Product[];
  id: number;
  price: ProductPrice;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    /*console.log("routeeee: "+this.router.url.split('/').pop());
    this.id = parseInt(this.router.url.split('/').pop());
    this.productService.getProduct(this.id)
      .then((product) => {
        this.product = product;
        console.log(this.product);
      });*/
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.productService.getProduct(this.id)
            .then((product) => {
              this.product = product;
              this.subproducts = product.products;              
              console.log(this.subproducts);
              console.log(this.product);
            });
          this.productService.getProductPrice(this.id)
          .then((price) => {
            this.price = price;
            //console.log(this.price.value);
          })
        });
    
  }

  onAddToShoppingList() {
    this.productService.addProductToShoppingList(this.product);
  }

  onEditProduct() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onEditProductPrice(){
    this.router.navigate(['price'], {relativeTo: this.route});

  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }

  onConsultPriceHistory(){
    this.router.navigate(['price-history'], { relativeTo: this.route });
  }

}
