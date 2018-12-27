import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
/*import { SharedModule } from './shared/shared.module';*/
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module'
import { CoreModule } from './core/core.module';
import { EngineComponent } from './engine/engine.component';
import { OrderComponent } from './orders/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    /*SharedModule,*/
    ShoppingListModule,
    AuthModule,
    CoreModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
