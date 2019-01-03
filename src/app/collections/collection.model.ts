import { Product } from "../products/product.model";
import { ProductRelation } from "../products/product-relation.model";

export class Collection {
  public CollectionId: number;
  public name: string;
  public products: Product[];

  constructor(name: string, products: Product[]) {
    this.name = name;
    this.products = products;
  }
}
export class CollectionDTO {
  public CollectionId: number;
  public name: string;
  public products: ProductRelation[];


  constructor(name: string, products: ProductRelation[]) {
    this.name = name;
    this.products = products;

  }
}
