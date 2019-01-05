export class Category {
    public CategoryId: number;
    public name: string;
    public father: Category;
  
    constructor(name: string, father: Category) {
      this.name = name;
      this.father = father;
        
    }
  }
  
  