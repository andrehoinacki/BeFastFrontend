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
   // this.router.navigate(['admin/usuario/', id]);
  }

  creditos(id) {    
    //this.router.navigate(['admin/usuario/vincular',id])
  }

  consumo(id){
    //this.actualPage = 1;
    //this.object_filter.pageNumber = 1;
    //this.load();
  }

  load(){
    const filtro = Object.assign(this.object_filter);
    this.usuarioService.list(filtro).subscribe(data=>{
      this.usuarios=data['list'][0].usuarios;
      this.totalRecords = data.totalRecords;
    });
  }
}