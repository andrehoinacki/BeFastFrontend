import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SaldoFilter } from 'src/app/util/saldo/saldo.filter';
import { Saldo } from 'src/app/util/saldo/saldo.model';
import { UsuarioService } from 'src/app/service/admin/usuario/usuario.service';

@Component({
  selector: 'app-historico-credito',
  templateUrl: './historico-credito.component.html',
  styleUrls: ['./historico-credito.component.css'],
  providers: [UsuarioService]
})
export class HistoricoCreditoComponent implements OnInit {

  creditos: Saldo[];

  id: number;
  message: string
  totalRecords: number;
  actualPage : number = 1;
  pageSize : number = 10;
  saldoDisponivel : number = 0;

  filtro : SaldoFilter = new SaldoFilter;

  constructor(
    private usuarioService : UsuarioService,
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
    this.usuarioService.listSaldoByUsuario(filtro).subscribe(data=>{
      let list = data['list'];
      list.forEach(element => {
        if(element.status != "Pendente"){
          this.saldoDisponivel += element.credito;
        }
        element.credito = this.formatReal(element.credito);
        if(element.credito < 0){
          element.status = "Debitado";
        }
      });
      this.creditos=data['list'];
      this.totalRecords = data.totalRecords;
    });
  }

  voltar(){
    this.router.navigate(['responsavel', ""]);
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