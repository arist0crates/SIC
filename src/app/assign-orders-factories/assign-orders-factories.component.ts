import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AssignOrdersService } from './assign-orders-factories.service';

@Component({
  selector: 'app-assign-orders-factories',
  templateUrl: './assign-orders-factories.component.html',
  styleUrls: ['./assign-orders-factories.component.css']
})
export class AssignOrdersFactoriesComponent implements OnInit {
  output : any;

  constructor(
    private assignOrdersService: AssignOrdersService,
    private authService: AuthService
  ) {
    this.output = {
      distance : -1,
      circuit: "[]"
    }
   }

  ngOnInit() {
    this.assignOrdersService.assignOrders().subscribe(output => this.output = output);
    console.log(this.output);
  }
}
