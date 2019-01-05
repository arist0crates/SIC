import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
/*import { SharedModule } from './shared/shared.module';*/
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module';
import { EngineComponent } from './engine/engine.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CalcCircuitComponent } from './calc-circuit/calc-circuit.component';
import { AssignOrdersFactoriesComponent } from './assign-orders-factories/assign-orders-factories.component';
import { ProductPriceComponent } from './products/product-price/product-price.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AddMaterialFinishingPriceComponent } from './add-material-finishing-price/add-material-finishing-price.component';
import { CatalogComponent } from './catalogs/catalog/catalog.component';
import { CollectionComponent } from './collections/collection/collection.component';
import { MaterialComponent } from './materials/material/material.component';
import { CategoryComponent } from './categories/category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    OrderComponent,
    OrderHistoryComponent,
    CalcCircuitComponent,
    AssignOrdersFactoriesComponent,
    PrivacyPolicyComponent,
    AddMaterialFinishingPriceComponent,
    CatalogComponent,
    CollectionComponent,
    MaterialComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    /*SharedModule,*/
    ShoppingListModule,
    AuthModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
