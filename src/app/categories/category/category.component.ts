import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  lCategories: Category[];
  categoryForm: FormGroup;
  categoryName: string;
  newCategory: Category;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.initForm();
    this.getCategories();
  }

  private initForm() {
    let categoryName: string;
    this.categoryForm = new FormGroup({
      'categoryName': new FormControl(categoryName, Validators.required),
    });
  }


  getCategories() {
    this.categoryService.getCategories()
      .then((lCategories) => {
        this.lCategories = lCategories;
        console.log(this.lCategories);
      });
  }

  onCreate(index: number) {
    this.categoryName = this.categoryForm.value['categoryName'];

    if (index < 0) {
      this.newCategory = new Category(this.categoryName, null);
      this.categoryService.postCategory(this.newCategory);
    } else {
      this.newCategory = new Category(this.categoryName, this.lCategories[index]);
      this.categoryService.postCategory(this.newCategory);
    }
  }
}
