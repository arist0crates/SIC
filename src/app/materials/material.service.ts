import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Material } from './material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

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
      .post('https://sicgc.azurewebsites.net/api/Material',JSON.stringify(material),
      httpOptions
      ).subscribe(data => {
        console.log(data);
      });
  }
}
