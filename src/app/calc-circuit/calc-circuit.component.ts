import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CalcCircuitService } from './calc-circuit.service';

@Component({
  selector: 'app-calc-circuit',
  templateUrl: './calc-circuit.component.html',
  styleUrls: ['./calc-circuit.component.css']
})
export class CalcCircuitComponent implements OnInit {
  output : any;

  constructor(
    private calcCircuitService: CalcCircuitService,
    private authService: AuthService
  ) {
    this.output = {
      distance : -1,
      circuit: "[]"
    }
   }

  ngOnInit() {
    this.calcCircuitService.calcCircuit().subscribe(output => this.output = output);
    console.log(this.output);
  }
}
