import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Material } from './material.model';
import { Config } from 'config';
import { MaterialFinish } from '../materialfinishes/materialfinish.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private url = Config.urlSiC_GC;
  constructor(public http: HttpClient, private authService: AuthService) {
  }

  postMaterial(material: Material) {
    let token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      })
    };

    console.log(material.name);
    
    return this
      .http
      .post(this.url+'/api/Material',JSON.stringify(material),
      httpOptions
      ).subscribe(data => {
        console.log(data);
      });
  }

  getMaterial() {
    return this
      .http
      .get('https://sicgc.azurewebsites.net/api/Material')
      .toPromise()
      .then(res => <Material[]>res)
      .then(data => { return data; });
  }
  
  postMaterialFinish(price: MaterialFinish) {
    let token = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      })
    };
    return this
      .http
      //.post('http://localhost:5000/api/MaterialFinishPrice', JSON.stringify(price),
      .post('https://sicgc.azurewebsites.net/api/MaterialFinish', JSON.stringify(price),
        httpOptions

      ).subscribe(data => {
        console.log(data);
      });
  }
}
