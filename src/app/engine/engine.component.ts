import { EngineService } from './engine.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product.model';
import { Dimension } from '../dimensions/dimension.model';
import { Category } from '../categories/category.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: [],
})
export class EngineComponent implements OnInit {
  private canEleId = 'renderCanvas';
  private product : Product;

  constructor(private engServ: EngineService, private shopServ: ShoppingListService) { }

  ngOnInit() {
    this.product = this.shopServ.getProductForPreview();
    this.engServ.createSceneProduct(this.canEleId,this.product);
    this.engServ.animate();
  }

  bootStrap() : Product{
    //GAVETA
    var height2 = 5;
    var width2 = 25
    var depth2 = 25;
    var category = new Category("Gaveta",null);
    var dimension2 = new Dimension(null,height2,height2,width2,width2,depth2,depth2);
    var product2 = new Product("GavetaV2",null,null,null,dimension2,category);

    //GAVETA2
    var height3 = 10;
    var width3 = 20;
    var depth3 = 25;
    var dimension3 = new Dimension(null,height3,height3,depth3,depth3,width3,width3);
    var product3 = new Product("GavetaV2",null,null,null,dimension3,category);
    var products = [product2,product3];

    //ARMARIO
    var height = 50;
    var width = 25;
    var depth = 25;
    var dimension = new Dimension(null,height,height,width,width,depth,depth);
    var product = new Product(null,null,null,products,dimension,null);
    product.products
    return product;
  }

}
