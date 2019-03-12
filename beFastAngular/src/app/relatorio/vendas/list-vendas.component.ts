import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendasService } from 'src/app/service/relatorio/vendas/vendas.service';
import { VendaFilter } from './vendas.filter';
import { Venda } from 'src/app/venda/venda-produto/venda.model';

@Component({
  selector: 'app-list-vendas',
  templateUrl: './list-vendas.component.html',
  styleUrls: ['./list-vendas.component.css'],
  providers: [VendasService]
})
export class ListVendasComponent implements OnInit {

  vendas: Venda[]

  message: string
  totalRecords: number;
  actualPage : number = 1;
  pageSize : number = 10;

  filtro : VendaFilter = new VendaFilter;

  constructor(
    private vendasService : VendasService,
    private router : Router,
    private route:ActivatedRoute,
  ) {}

  ngOnInit() {
  }

  pageChanged(event) {
    this.actualPage = event;
    this.filtro.pageNumber = event;
    this.list();
  }

  list(){
    const filtro = Object.assign(this.filtro);
    this.vendasService.list(filtro).subscribe(data=>{
      this.vendas=data['list'];
      this.totalRecords = data.totalRecords;
    });
  }
}