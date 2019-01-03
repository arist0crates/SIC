import { Product } from "../products/product.model";

export class Collection {
  public CollectionId: number;
  public name: string;
  public products: Product[];

  constructor(name: string, products: Product[]) {
    this.name = name;
    this.products = products;
  }
}
