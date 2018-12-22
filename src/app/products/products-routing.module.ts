import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductStartComponent } from './product-start/product-start.component';
import { ProductsComponent } from './products.component';

const productsRoutes: Routes = [
  { path: '', component: ProductsComponent, children: [
    // { path: '', component: ProductStartComponent },
    { path: 'new', component: ProductEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent, canActivate: [AuthGuard] },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class ProductsRoutingModule {}