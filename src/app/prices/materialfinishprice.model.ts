import { MaterialFinish } from "../materialfinishes/materialfinish.model";

export class MaterialFinishPrice {
    public MaterialFinishPriceId: number;
    public value: number;
    public item: MaterialFinish;
    public applicableDate : Date;
  
    constructor(value: number, item: MaterialFinish, applicableDate : Date) {
      this.value = value;
      this.item = item;
      this.applicableDate = applicableDate;
        
    }
  }
  