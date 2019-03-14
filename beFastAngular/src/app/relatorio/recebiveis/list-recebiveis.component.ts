import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VendasService } from 'src/app/service/relatorio/vendas/vendas.service';
import { RecebiveisFilter } from './recebiveis.filter';
import { RecebiveisService } from 'src/app/service/relatorio/recebiveis/recebiveis.service';
import { Recebiveis } from './recebiveis.model';
import { Usuario } from 'src/app/admin/usuario/usuario.model';

@Component({
  selector: 'app-list-recebiveis',
  templateUrl: './list-recebiveis.component.html',
  styleUrls: ['./list-recebiveis.component.css'],
  providers: [VendasService]
})
export class ListRecebiveisComponent implements OnInit {

  recebiveis: Recebiveis[]
  usuarios: Usuario[];

  message: string
  totalRecords: number;
  actualPage : number = 1;
  pageSize : number = 10;
  r : Recebiveis;
  total : number = 0;

  filtro : RecebiveisFilter = new RecebiveisFilter;

  constructor(
    private recebiveisService : RecebiveisService,
    private router : Router,
    private route:ActivatedRoute,
  ) {}

  ngOnInit() {
    this.recebiveis = [];
    this.list();
  }

  pageChanged(event) {
    this.actualPage = event;
    this.filtro.pageNumber = event;
    this.list();
  }

  list(){
    const filtro = Object.assign(this.filtro);
    this.recebiveisService.list(filtro).subscribe(data=>{
      this.usuarios=data['list'];
      this.totalRecords = data.totalRecords;
      this.usuarios.forEach(user => {
        this.r = new Recebiveis;
        this.r.usuario = user.nome;
        user.saldo.forEach(saldo => {
          if(saldo.status != "Pendente"){
            this.r.saldo = this.r.saldo + saldo.credito;
          } else {
            this.r.saldoPendente = this.r.saldoPendente + saldo.credito;
          }        
        });
        if(this.r.saldo > 0) {
          this.total = this.total + this.r.saldo;// + this.r.saldoPendente;
          this.recebiveis.push(this.r);
        }
      });
    })
  }
}