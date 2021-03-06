import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingListService } from '../shopping-list.service';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialFinish } from 'src/app/materialfinishes/materialfinish.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Product;
  finalProduct: Product;
  heightSliderVal: number;
  depthSliderVal: number;
  widthSliderVal: number;
  products: Product[];
  materials: MaterialFinish[];

  constructor(private slService: ShoppingListService, private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(() => {
        this.productService.getProducts()
          .then((products) => {
            this.products = products;
            console.log(this.products);
          })
      })
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getProduct(index);
          this.finalProduct = this.slService.getProduct(index);
          this.materials = this.finalProduct.possibleMaterialFinishes;
          console.log(this.materials);
          this.heightSliderVal = this.editedItem.dimensions.minHeight;
          this.depthSliderVal = this.editedItem.dimensions.minDepth;
          this.widthSliderVal = this.editedItem.dimensions.minWidth;
          this.slForm.setValue({
            name: this.editedItem.name,
          })
        }
      );
  }

  inPreview(){
    this.slService.setProductForPreview(this.editedItem);
    console.log("okkkkk" + this.editedItem.products.length);
    this.router.navigate(['/engine'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    this.editedItem.dimensions.minHeight = this.heightSliderVal;
    this.editedItem.dimensions.minDepth = this.depthSliderVal;
    this.editedItem.dimensions.minWidth = this.widthSliderVal;
    this.editedItem.dimensions.maxHeight = this.heightSliderVal;
    this.editedItem.dimensions.maxDepth = this.depthSliderVal;
    this.editedItem.dimensions.maxWidth = this.widthSliderVal;
    const value = form.value;
    this.selectMaterial();
    console.log("NAME:" + value.name);
    const newProduct = new Product(value.name, this.editedItem.productId, this.editedItem.possibleMaterialFinishes, this.editedItem.products, this.editedItem.dimensions, this.editedItem.category);
    console.log(newProduct.name);
    if (this.editMode) {
      this.slService.updateProduct(this.editedItemIndex, newProduct);
    } else {
      this.slService.addProduct(newProduct);
    }
    this.editMode = false;
    form.reset();
    this.widthSliderVal = 0;
    this.ngOnInit();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.ngOnInit();
  }

  onDelete() {
    this.slService.deleteProduct(this.editedItemIndex);
    this.editedItem.products.splice(0, this.editedItem.products.length);
    this.onClear();
  }

  onDeleteSubProduct(index: number) {
    this.editedItem.products.splice(index, 1);
  }
  onAddSubProduct(index: number) {
    this.editedItem.products.push(this.products[index]);
    this.slService.addProduct(this.products[index]);
  }

  onHeightSliderChange(val) {
    this.heightSliderVal = val;

  }
  onDepthSliderChange(val) {
    this.depthSliderVal = val;

  }
  onWidthSliderChange(val) {
    this.widthSliderVal = val;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectMaterial(){
    var aux = (<HTMLSelectElement>document.getElementById('dropbox')).selectedIndex;
    var materialAux = this.editedItem.possibleMaterialFinishes[aux];
    this.editedItem.possibleMaterialFinishes.splice(aux,1);
    this.editedItem.possibleMaterialFinishes.unshift(materialAux);
    console.log(this.editedItem.possibleMaterialFinishes);
  }

}
