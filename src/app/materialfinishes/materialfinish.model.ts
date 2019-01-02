import { Material } from "../materials/material.model";

export class MaterialFinish {
    public MaterialFinishId: number;
    public name: string;
    public material: Material;
  
    constructor( MaterialFinishId: number,name:string , material: Material) {
      this.MaterialFinishId = MaterialFinishId;
      this.name = name;
      this.material = material;
        
    }
  }
  