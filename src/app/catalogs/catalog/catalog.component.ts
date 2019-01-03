import { Component, OnInit } from '@angular/core';
//import { CatalogService } from 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/products/product.model';
import { Catalog } from '../catalog.model';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  lproducts: Product[];
  laddedProducts: Product[] = [];
  newCatalog: Catalog;
  //collectionName: string;

  constructor(private route: ActivatedRoute,
    private catalogService: CatalogService,
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
    this.catalogService.getProducts()
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

  onSubmit(catalogName: string) {
    console.log(catalogName);
    console.log(this.laddedProducts);

    this.newCatalog = new Catalog(
      catalogName,
      this.laddedProducts
    );
    this.catalogService.postCatalog(this.newCatalog);
  }
}
