import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { Collection } from '../collection.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})

export class CollectionComponent implements OnInit {
  lproducts: Product[];
  laddedProducts: Product[] = [];
  newCollection: Collection;
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

   this.newCollection = new Collection(
     collectionName,
     this.laddedProducts
   );
    this.collectionService.postCollection(this.newCollection);
  }


}
