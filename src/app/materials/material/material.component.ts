import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from '../material.service';
import { Material } from '../material.model';
import { MaterialFinish } from 'src/app/materialfinishes/materialfinish.model';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  materialForm: FormGroup;
  material: Material;
  materials: Material[];
  name: string;
  materialFinishName: string;
  materialFinish: MaterialFinish;
  selectedMaterial: Material;

  constructor(private matSer: MaterialService) { }

  ngOnInit() {
    this.initForm();
    this.getMaterials();
  }

  private initForm() {
    let name: string;
    let materialFinishName: string;

    this.materialForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'materialFinishName': new FormControl(materialFinishName, Validators.required),
    });
  }

  onCreate() {
    this.name = this.materialForm.value['name'];
    this.material = new Material(this.name);
    console.log(this.material.name);
    this.matSer.postMaterial(this.material);
  }
  onCreateMaterialFinish() {
    this.materialFinishName = this.materialForm.value['materialFinishName'];
    this.materialFinish = new MaterialFinish(this.materialFinishName, this.selectedMaterial);
    this.matSer.postMaterialFinish(this.materialFinish);
  }

  getMaterials() {
    this.matSer.getMaterial()
      .then((materials) => {
        this.materials = materials;
        console.log(this.materials);
      });
  }

  select(index: number) {
    this.selectedMaterial = this.materials[index];
    console.log(this.selectedMaterial);
  }

}
