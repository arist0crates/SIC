export class Category {
    public CategoryId: number;
    public name: string;
    public father: Category;
  
    constructor(CategoryId: number, name: string, father: Category) {
      this.CategoryId = CategoryId;
      this.name = name;
      this.father = father;
        
    }
  }
  
  