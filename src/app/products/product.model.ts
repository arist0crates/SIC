import { MaterialFinish } from "../materialfinishes/materialfinish.model";
import { Dimension } from "../dimensions/dimension.model";
import { DimensionDTO } from "../dimensions/dimension.model";
import { Category } from "../categories/category.model";
import { ProductRelation } from "./product-relation.model";


export class Product {
  public productId: number;
  public name: string;
  public possibleMaterialFinishes: MaterialFinish[];
  public products: Product[];
  public dimensions: Dimension;
  public category: Category;


  constructor(name: string, productId: number, possibleMaterialFinishes: MaterialFinish[], products: Product[], dimensions: Dimension, category: Category) {
    this.name = name;
    this.productId = productId;
    this.possibleMaterialFinishes = possibleMaterialFinishes;
    this.products = products;
    this.dimensions = dimensions;
    this.category = category;

  }
}

export class ProductDTO {
  public productId: number;
  public name: string;
  public possibleMaterialFinishes: MaterialFinish[];
  public products: ProductRelation[];
  public dimensions: DimensionDTO;
  public category: Category;


  constructor(name: string,possibleMaterialFinishes: MaterialFinish[], products: ProductRelation[], dimensions: DimensionDTO, category: Category) {
    this.name = name;
    this.possibleMaterialFinishes = possibleMaterialFinishes;
    this.products = products;
    this.dimensions = dimensions;
    this.category = category;

  }
}
