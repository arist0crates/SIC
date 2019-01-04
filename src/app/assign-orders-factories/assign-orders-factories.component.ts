import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AssignOrdersService } from './assign-orders-factories.service';
import { OrderFactoryAssignment } from './order-factory-assignment.model';

@Component({
  selector: 'app-assign-orders-factories',
  templateUrl: './assign-orders-factories.component.html',
  styleUrls: ['./assign-orders-factories.component.css']
})
export class AssignOrdersFactoriesComponent implements OnInit {
  output : any;
  Assignments = [];

  constructor(
    private assignOrdersService: AssignOrdersService,
    private authService: AuthService
  ) {
    this.output = {
      Assignments : []
    }
   }

   ngOnInit() {
    //this.assignOrdersService.assignOrders().subscribe(output => this.output = output);
    this.assignOrdersToFactory();
    console.log("onInit result" + JSON.stringify(this.Assignments)); 
  }

  assignOrdersToFactory() {
    this.assignOrdersService.assignOrders()
      .then((any : any) => {
        this.output = any;
        console.log("assignOrdersService.then() result: " + JSON.stringify(this.output));
      });
  }
}
