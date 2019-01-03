import { Product } from "../product.model";

export class ProductPrice {
  public ProductPriceId: number;
  public value: number;
  public item: Product;
  public applicableDate: Date;


  constructor(productPriceId:number,value:number,item:Product,applicableDate:Date) {
    this.ProductPriceId = productPriceId;
    this.value = value;
    this.item = item;
    this.applicableDate = applicableDate;
  }
}
