import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendasService } from 'src/app/service/relatorio/vendas/vendas.service';
import { Venda } from 'src/app/venda/venda-produto/venda.model';
import { VendaFilter } from 'src/app/relatorio/vendas/vendas.filter';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css'],
  providers: [VendasService]
})
export class ConsumoComponent implements OnInit {

  consumos: Venda[]

  id: number;
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
    this.id = this.route.snapshot.params['id'];

    this.filtro.dataFinal = new Date;
    this.filtro.dataInicial = new Date;
    this.filtro.dataInicial.setDate(this.filtro.dataFinal.getDate() - 30)

    this.route.paramMap.subscribe(params => {
      if(this.id != -1){
        this.filtro.idCliente  = this.id;
        this.list();
      }
    });   
  }

  pageChanged(event) {
    this.actualPage = event;
    this.filtro.pageNumber = event;
    this.list();
  }

  list(){
    const filtro = Object.assign(this.filtro);
    this.vendasService.list(filtro).subscribe(data=>{
      this.consumos=data['list'];
      this.totalRecords = data.totalRecords;
    });
  }

  voltar(){
    this.router.navigate(['responsavel', ""]);
  }
}