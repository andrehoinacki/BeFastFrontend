import { Component, OnInit } from '@angular/core';

import { Usuario } from '../admin/usuario/usuario.model';
import { Saldo } from '../util/saldo/saldo.model';


@Component({
  selector: 'app-consulta-saldo',
  templateUrl: './consulta-saldo.component.html',
  styleUrls: ['./consulta-saldo.component.css']
})
export class ConsultaSadoComponent implements OnInit {

  usuario : Usuario;
  saldo : Saldo;
  saldoAtual : number = 0;
  saldoPendente : number = 0;


  constructor() { }

  ngOnInit() {
    this.saldo = new Saldo();
    this.usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    this.usuario.saldo.forEach(saldo => {
      if(saldo.status != "Pendente"){
        this.saldoAtual = this.saldoAtual + saldo.credito;
      } else {
        this.saldoPendente = this.saldoPendente + saldo.credito;
      }
    });
  }

  formatReal( int ) {
    if(int == null) {
      return "0,00"
    }   
    var tmp = int+'';
    tmp = tmp.replace(".", ",");
    if(tmp.length <= 2) {
      tmp = tmp.concat(",00");
    }
    else if( tmp.length == 4 || tmp.length == 3 ) {
      tmp = tmp.concat("0");
    }    

    return tmp;
  }
}
