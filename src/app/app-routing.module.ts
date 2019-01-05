import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';
import { EngineComponent } from './engine/engine.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './orders/order/order.component';
import { AuthGuard } from './auth/auth-guard.service';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AddMaterialFinishingPriceComponent } from './add-material-finishing-price/add-material-finishing-price.component';
import { CalcCircuitComponent } from './calc-circuit/calc-circuit.component';
import { AssignOrdersFactoriesComponent } from './assign-orders-factories/assign-orders-factories.component';
import { CatalogComponent } from './catalogs/catalog/catalog.component';
import { CollectionComponent } from './collections/collection/collection.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MaterialComponent } from './materials/material/material.component';
import { CategoryComponent } from './categories/category/category.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', loadChildren: './products/products.module#ProductsModule', canActivate: [AuthGuard] },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
  { path: 'engine', component: EngineComponent, canActivate: [AuthGuard] },
  { path: 'order-history', component: OrderHistoryComponent,canActivate: [AuthGuard] },
  { path: 'materialFinish', component: AddMaterialFinishingPriceComponent },
  { path: 'calc-circuit', component: CalcCircuitComponent },
  { path: 'assign-orders-factories', component: AssignOrdersFactoriesComponent },
  { path: 'signup/privacy', component: PrivacyPolicyComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'material', component: MaterialComponent },
  { path: 'category', component: CategoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule {

}
