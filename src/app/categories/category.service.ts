import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http: HttpClient, private authService: AuthService) { }


  getCategories() {
    return this
      .http
      .get('https://sicgc.azurewebsites.net/api/Category')
      .toPromise()
      .then(res => <Category[]>res)
      .then(data => { return data; });
  }


  postCategory(category: Category) {
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
      .post('https://sicgc.azurewebsites.net/api/Category', JSON.stringify(category),
        httpOptions
      ).subscribe(data => {
        console.log(data);
      });
  }
}
