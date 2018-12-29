import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { MaterialFinish } from 'src/app/materialfinishes/materialfinish.model';
import { Category } from 'src/app/categories/category.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: number;
  productForm: FormGroup;
  product: Product;
  lcategory: Category[];
  lmaterialfinish: MaterialFinish[];
  lproducts: Product[];
  lsubProducts: Array<Product> = [];
  newProduct: Product;


  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.initForm();
        }
      );

    this.getCategories();
    this.getMaterialFinish();
    this.getProducts();
  }

  onSubmit() {
    const newProduct = new Product(
      this.productForm.value['productId'],
      this.productForm.value['name'],
      this.productForm.value['possibleMaterialFinishes'],
      this.productForm.value['products'],
      this.productForm.value['dimensions'],
      this.productForm.value['category']);

    this.onCancel();
  }


  onSubmit2(productForm: FormGroup) {
    console.log("-----------------------------------");
    console.log(this.productForm.value['name']);
    
    console.log(this.productForm.value['categoryChild']);
    //console.log(this.productForm.value['categoryFather']);
    //console.log(this.category);

    console.log(this.productForm.value['productDimensionminHeight']);
    console.log(this.productForm.value['productDimensionmaxHeight']);

    console.log(this.productForm.value['productDimensionminWidth']);
    console.log(this.productForm.value['productDimensionmaxWidth']);

    console.log(this.productForm.value['productDimensionminDepth']);
    console.log(this.productForm.value['productDimensionmaxDepth']);

    console.log(this.lsubProducts);

    this.onCancel();

  }

  private initForm() {
    let productId: number;
    let productName: string;
    let categoryChild: string;
    let categoryFather: string;
    let productPossibleMaterialFinishes: MaterialFinish[];
    let productDimensionminHeight: number;
    let productDimensionmaxHeight: number;
    let productDimensionminDepth: number;
    let productDimensionmaxDepth: number;
    let productDimensionminWidth: number;
    let productDimensionmaxWidth: number;
    let productCategory: Category;

    this.productForm = new FormGroup({
    //  'productId': new FormControl(productId, Validators.required),
      'name': new FormControl(productName, Validators.required),
      'categoryChild': new FormControl(categoryChild, Validators.required),
      'categoryFather': new FormControl(categoryFather, Validators.required),
      //'productPossibleMaterialFinishes': new FormControl(productPossibleMaterialFinishes, Validators.required),
      'productDimensionminHeight': new FormControl(productDimensionminHeight, Validators.required),
      'productDimensionmaxHeight': new FormControl(productDimensionmaxHeight, Validators.required),
      'productDimensionminDepth': new FormControl(productDimensionminDepth, Validators.required),
      'productDimensionmaxDepth': new FormControl(productDimensionmaxDepth, Validators.required),
      'productDimensionminWidth': new FormControl(productDimensionminWidth, Validators.required),
      'productDimensionmaxWidth': new FormControl(productDimensionmaxWidth, Validators.required),
      //'productCategory': new FormControl(productCategory, Validators.required),

    });

  }

  getProducts() {
    this.productService.getProducts()
      .then((lproducts) => {
        this.lproducts = lproducts;
        console.log(this.lproducts);
      });
  }

  getCategories() {
    this.productService.getCategory()
      .then((lcategory) => {
        this.lcategory = lcategory;
        console.log(this.lcategory);
      });
  }

  getMaterialFinish() {
    this.productService.getMaterialFinish()
      .then((lmaterialfinish) => {
        this.lmaterialfinish = lmaterialfinish;
        console.log(this.lmaterialfinish);
      });
  }

  onDeleteSubProduct(index: number) {
    this.lsubProducts.splice(index, 1);
  }

  onAddSubProduct(index: number) {
    this.lsubProducts.push(this.lproducts[index]);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getControls() {
    return (<FormArray>this.productForm.get('products')).controls,
      (<FormArray>this.productForm.get('possibleMaterialFinishes')).controls;
  }

  onAddProduct() {
    (<FormArray>this.productForm.get('products')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)

      })
    );
  }
}
