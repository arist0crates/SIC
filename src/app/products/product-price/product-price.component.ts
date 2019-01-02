import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent implements OnInit {

  product: Product;
  id: number;
  productForm: FormGroup;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.initForm();
          this.productService.getProduct(this.id)
            .then((product) => {
              this.product = product;
            });
        })
  }

  create(){
    console.log(this.productForm.value['productPrice']);
  }

  private initForm(){
    let productPrice: number;

    this.productForm = new FormGroup({
      'productPrice':new FormControl(productPrice, Validators.required)
    });
  }

}
