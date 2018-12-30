import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductStartComponent } from './product-start/product-start.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductPriceComponent } from './product-price/product-price.component';
import { CollectionEditComponent } from './collection-edit/collection-edit.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductStartComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductItemComponent,
    ProductPriceComponent,
    CollectionEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule {}
