import { Component, OnInit, ViewChild } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-credito-boleto',
  templateUrl: './credito-boleto.component.html',
  styleUrls: ['./credito-boleto.component.css']
})
export class CreditoBoletoComponent implements OnInit {
  hasUsuario : boolean;
  matricula : String;
  nomeAluno : String;
  valorCredito : number;
  constructor() { }
  
  ngOnInit() {
    this.hasUsuario = true;
    this.matricula = '101890';
    this.nomeAluno = 'Andre Luis Loureiro';
    console.log('Teste');
  }

  download() {
    
  }
  
}
