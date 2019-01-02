export class ProductRelation {
  public ParentProductId: number;
  public ChildProductId: number;



  constructor(ChildProductId: number) {
    this.ChildProductId = ChildProductId;

  }
}

