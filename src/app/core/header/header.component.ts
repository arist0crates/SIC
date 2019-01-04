import { Component } from '@angular/core';
import { Response } from '@angular/http';

//import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public role : string;
  constructor(/*private dataStorageService: DataStorageService,*/
    private authService: AuthService) {
  }

  /*onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }*/

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAuthenticatedAsCustomer(){
    return this.authService.isAuthenticatedAsCustomer();
  }

  isAuthenticatedAsOrderManager(){
    return this.authService.isAuthenticatedAsOrderManager();
  }

  isAuthenticatedAsClericalWorker(){
    return this.authService.isAuthenticatedAsClericalWorker();
  }

  isAuthenticatedAsContentManager(){
    return this.authService.isAuthenticatedAsContentManager();
  }

  getRole(){
    this.role = this.authService.getRole();
  }

  onDeleteData() {
    this.authService.deleteUser();
  }
}
