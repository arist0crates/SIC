export class Dimension {
  public DimensionId: number;
  public minHeight: number;
  public maxHeight: number;
  public minDepth: number;
  public maxDepth: number;
  public minWidth: number;
  public maxWidth: number;

  constructor(DimensionId: number, minHeight: number, maxHeight: number, minDepth: number, maxDepth: number, minWidth: number, maxWidth: number) {
    this.DimensionId = DimensionId;
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
    this.minDepth = minDepth;
    this.maxDepth = maxDepth;
    this.minWidth = minWidth;
    this.maxWidth = maxWidth;

  }
}

export class DimensionDTO {

  public minHeight: number;
  public maxHeight: number;
  public minDepth: number;
  public maxDepth: number;
  public minWidth: number;
  public maxWidth: number;

  constructor( minHeight: number, maxHeight: number, minDepth: number, maxDepth: number, minWidth: number, maxWidth: number) {
    this.minHeight = minHeight;
    this.maxHeight = maxHeight;
    this.minDepth = minDepth;
    this.maxDepth = maxDepth;
    this.minWidth = minWidth;
    this.maxWidth = maxWidth;

  }
}
