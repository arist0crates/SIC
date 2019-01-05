import { Material } from "../materials/material.model";

export class MaterialFinish {
    public MaterialFinishId: number;
    public name: string;
    public material: Material;
  
    constructor(name:string , material: Material) {
      this.name = name;
      this.material = material;
        
    }
  }
  