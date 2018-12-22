import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';
import { EngineComponent } from './engine/engine.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', loadChildren: './products/products.module#ProductsModule'},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'engine', component: EngineComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}