import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venda-produto',
  templateUrl: './venda-produto.component.html',
  styleUrls: ['./venda-produto.component.css']
})
export class VendaProdutoComponent implements OnInit {
  saldo : number;

  constructor() { }

  ngOnInit() {
    this.saldo = 0;
  }
}
