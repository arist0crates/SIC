import { Product } from "../product.model";

export class ProductPrice {
  public ProductPriceId: number;
  public value: number;
  public item: Product;
  public applicableDate: Date;


  constructor(value:number,item:Product,applicableDate:Date) {
    this.value = value;
    this.item = item;
    this.applicableDate = applicableDate;
  }
}
