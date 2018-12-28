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
  editMode = false;
  productForm: FormGroup;
  product: Product;
  lcategory: Category[];

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
      this.getCategories();
  }

  onSubmit() {
    const newProduct = new Product(
      this.productForm.value['productId'],
      this.productForm.value['name'],
      this.productForm.value['possibleMaterialFinishes'],
      this.productForm.value['products'],
      this.productForm.value['dimensions'],
      this.productForm.value['category']);
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }

  onAddProduct() {
    (<FormArray>this.productForm.get('products')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)

      })
    );
  }

  onDeleteProduct(index: number) {
    (<FormArray>this.productForm.get('products')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getControls() {
    return (<FormArray>this.productForm.get('products')).controls,
      (<FormArray>this.productForm.get('possibleMaterialFinishes')).controls;
  }

  private initForm() {
    let productId: number;
    let productName: string;
    let productProducts: Product[];
    let productPossibleMaterialFinishes: MaterialFinish[];
    let productDimensionminHeight: number;
    let productDimensionmaxHeight: number;
    let productDimensionminDepth: number;
    let productDimensionmaxDepth: number;
    let productDimensionminWidth: number;
    let productDimensionmaxWidth: number;
    let productCategory: Category;

    if (this.editMode) {
      this.productService.getProduct(this.id)
        .then((product) => {
          this.product = product;
          console.log(this.product);
        });
      productName = this.product.name;
      productId = this.product.productId;
      productDimensionminHeight = this.product.dimensions.minHeight;
      productDimensionmaxHeight = this.product.dimensions.maxHeight;
      productDimensionminDepth = this.product.dimensions.minDepth;
      productDimensionmaxDepth = this.product.dimensions.maxDepth;
      productDimensionminWidth = this.product.dimensions.minWidth;
      productDimensionmaxWidth = this.product.dimensions.maxWidth;
      productCategory

      if (this.product['products']) {
        for (let product of this.product.products) {
          productProducts.push(product);
        }
      }

      if (this.product['possibleMaterialFinishes']) {
        for (let materialFinish of this.product.possibleMaterialFinishes) {
          productPossibleMaterialFinishes.push(materialFinish);
        }
      }
    }

    this.productForm = new FormGroup({
      'productId': new FormControl(productId, Validators.required),
      'name': new FormControl(productName, Validators.required),
      'productPossibleMaterialFinishes': new FormControl(productPossibleMaterialFinishes, Validators.required),
      'products': new FormControl(productProducts, Validators.required),
      'productDimensionminHeight': new FormControl(productDimensionminHeight, Validators.required),
      'productDimensionmaxHeight': new FormControl(productDimensionmaxHeight, Validators.required),
      'productDimensionminDepth': new FormControl(productDimensionminDepth, Validators.required),
      'productDimensionmaxDepth': new FormControl(productDimensionmaxDepth, Validators.required),
      'productDimensionminWidth': new FormControl(productDimensionminWidth, Validators.required),
      'productDimensionmaxWidth': new FormControl(productDimensionmaxWidth, Validators.required),
      'productCategory': new FormControl(productCategory, Validators.required),

    });
  }

  getCategories(){
    this.productService.getCategory()
      .then((lcategory) => {
        this.lcategory = lcategory;
        console.log(this.lcategory);
      });
  }

}
