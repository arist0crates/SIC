import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { Collection, CollectionDTO } from '../collection.model';
import { ProductRelation } from 'src/app/products/product-relation.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})

export class CollectionComponent implements OnInit {
  lproducts: Product[];
  laddedProducts: Product[] = [];
  newCollection: CollectionDTO;
  //collectionName: string;

  constructor(private route: ActivatedRoute,
    private collectionService: CollectionService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {

        }
      );
      this.getProducts();
  }

  getProducts() {
    this.collectionService.getProducts()
      .then((lproducts) => {
        this.lproducts = lproducts;
        console.log(this.lproducts);
      });
  }

  onDeleteSubProduct(index: number) {
    this.laddedProducts.splice(index, 1);
  }

  onAddSubProduct(index: number) {
    var addedProduct = this.lproducts[index];
    this.laddedProducts.push(addedProduct);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

 onSubmit(collectionName: string){
   console.log(collectionName);
   console.log(this.laddedProducts);

   var productRelationsaux: ProductRelation[] = [];

   for (let subproduct of this.laddedProducts) {
     var subproductrelation = new ProductRelation(subproduct.productId);
     productRelationsaux.push(subproductrelation);
   }

   this.newCollection = new CollectionDTO(
     collectionName,
     productRelationsaux
   );
    this.collectionService.postCollection(this.newCollection);
  }


}
