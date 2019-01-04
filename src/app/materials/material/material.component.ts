import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from '../material.service';
import { Material } from '../material.model';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  materialForm: FormGroup;
  material: Material;
  name : string;

  constructor(private matSer : MaterialService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm(){
    let name : string;

    this.materialForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
    });
  }

  onCreate(){
    this.name = this.materialForm.value['name'];
    this.material = new Material(this.name);
    console.log(this.material.name);
    this.matSer.postMaterial(this.material);
  }

}
