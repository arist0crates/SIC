import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductPrice } from 'src/app/prices/productprice.model';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent implements OnInit {

  product: Product;
  productPrice: ProductPrice;
  productPriceDate: Date;
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
    if(this.productForm.value['productPrice'] != null && this.productForm.value['productPriceDate'] != null){
      this.productPrice = new ProductPrice(0,this.productForm.value['productPrice'],this.product,this.productForm.value['productPriceDate']);
      this.productService.postProductPrice(this.productPrice);
      console.log("CREATE");
    }else{
      console.log("NOT CREATE");
    }
  }

  private initForm(){
    let productPrice: number;
    let productPriceDate: Date;

    this.productForm = new FormGroup({
      'productPrice':new FormControl(productPrice, Validators.required),
      'productPriceDate':new FormControl(productPriceDate, Validators.required)
    });
  }

}
