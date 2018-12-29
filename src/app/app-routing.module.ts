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
import { CalcCircuitComponent } from './calc-circuit/calc-circuit.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', loadChildren: './products/products.module#ProductsModule' },
  { path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard] },
  { path: 'engine', component: EngineComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'calc-circuit', component: CalcCircuitComponent }
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
