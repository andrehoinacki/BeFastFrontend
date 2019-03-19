import { UsuarioService } from '../../service/admin/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/admin/usuario/usuario.model';
import { UsuarioFilter } from 'src/app/admin/list-usuario/usuario.filter';

@Component({
  selector: 'app-list-alunos',
  templateUrl: './list-alunos.component.html',
  styleUrls: ['./list-alunos.component.css'],
  providers: [UsuarioService]
})
export class ListAlunosComponent implements OnInit {

  usuarios: Usuario[]

  message: string
  username: string
  totalRecords: number;
  actualPage : number = 1;
  pageSize : number = 10;

  object_filter : UsuarioFilter = new UsuarioFilter;

  constructor(
    private usuarioService : UsuarioService,
    private router : Router,
    private route:ActivatedRoute,
  ) { console.log("Entrei 1");}

  ngOnInit() {
    console.log("Entrei");
    this.object_filter.username = sessionStorage.getItem("authenticaterUser");
    this.load();   
  }

  pageChanged(event) {
    this.actualPage = event;
    this.object_filter.pageNumber = event;
    this.load();
  }

   updateRestricao(id) {
    console.log(`update ${id}`)
    this.router.navigate(['responsavel/updaterestricao',id])
  }

  updateSaldo(id){
    this.router.navigate(['venda/credito/boleto/', id]);
  }

  creditos(id) {    
    //this.router.navigate(['admin/usuario/vincular',id])
  }

  consumo(id){
    console.log(`update ${id}`)
    this.router.navigate(['responsavel/historicoconsumo',id])
  }

  load(){
    const filtro = Object.assign(this.object_filter);
    this.usuarioService.list(filtro).subscribe(data=>{
      this.usuarios=data['list'][0].usuarios;
      this.usuarios.forEach(user => {
        user['saldoAtual'] = 0;
        user['saldoPendente'] = 0;
        user.saldo.forEach(saldo => {
          if(saldo.status == "Creditado") {
            user['saldoAtual'] += saldo.credito;
          } else {
            user['saldoPendente'] += saldo.credito;
          }
        });
        user['saldoAtual'] = this.formatReal(user['saldoAtual']);
        user['saldoPendente'] = this.formatReal(user['saldoPendente']);
      });
      this.totalRecords = data.totalRecords;
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
    else if( tmp.length == 4 ) {
      tmp = tmp.concat("0");
    }    

    return tmp;
  }
}