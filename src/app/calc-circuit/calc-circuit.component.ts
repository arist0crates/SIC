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
  ) { }

  ngOnInit() {
    this.calcCircuit();
  }

  calcCircuit(): void {
    /*if(this.authService.isAuthenticated() == true){
      this.calcCircuitService.calcCircuit().subscribe(output => this.output = output);
    }else{
      console.log("Utilizador não logado!!");
    }*/
    this.calcCircuitService.calcCircuit().subscribe(output => this.output = output);
  }
}
