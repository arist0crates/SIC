import { Component, OnInit } from '@angular/core';
import { MaterialFinish } from '../materialfinishes/materialfinish.model'
import{MaterialFinishPrice} from '../prices/materialfinishprice.model'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { parseDate } from 'tough-cookie';
@Component({
  selector: 'app-add-material-finishing-price',
  templateUrl: './add-material-finishing-price.component.html',
  styleUrls: ['./add-material-finishing-price.component.css']
})
export class AddMaterialFinishingPriceComponent implements OnInit {

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }
    materialFinishing: MaterialFinish;
    id:number;
    materialFinishings: MaterialFinish[] = [];
  ngOnInit() {
    this.getMaterialFinishes();
  }
  getMaterialFinishes(): void {

      this.productService.getMaterialFinish()
      .then((materialFinishings) => {
        this.materialFinishings = materialFinishings;
        console.log("lalalalal" + this.materialFinishings[1].MaterialFinishId);
      });
  }
  select(id: number){
    this.id=id;
    this.productService.getMaterialFinishById(id).then((response) => {
      this.materialFinishing =response;
      console.log("lalalalal" + this.materialFinishing);
    });;
  }
  addPrice(){
    var a = parseFloat((document.getElementById("ProductPrice") as HTMLInputElement).value)
    var c = ((document.getElementById("dt_init") as HTMLInputElement).value);
    var d = new Date(c);
    var b = new MaterialFinishPrice(a, this.materialFinishing,d);
    this.productService.postMaterialFinishPrice(b);
   
  }

}
