import { Component, OnInit } from '@angular/core';
import { RetornoService } from '../retorno.service';

@Component({
  selector: 'app-retorno-banco',
  templateUrl: './retorno-banco.component.html',
  styleUrls: ['./retorno-banco.component.css']
})
export class RetornoBancoComponent implements OnInit {

  constructor(
    private retornoService : RetornoService
  ) { }

  ngOnInit() {
  }

  atualizar() {
    this.retornoService.atualizarRetorno().subscribe(data=>{               
    });    
  }

}
