import { UsuarioService } from '../../service/admin/usuario/usuario.service';
import { UsuarioFilter } from './usuario.filter';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../usuario/usuario.model';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css'],
  providers: [UsuarioService]
})
export class ListUsuarioComponent implements OnInit {

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
  ) { }

  ngOnInit() {
    this.load();   
  }

  pageChanged(event) {
    this.actualPage = event;
    this.object_filter.pageNumber = event;
    this.load();
  }

  deleteUsuario(id) {
    let username = sessionStorage.getItem('authenticaterUser')
    this.usuarioService.deleteUsuario(id).subscribe (
      response => {
        this.message = `Usuário deletado com sucesso`;
        this.load();
      }
    )
  }

  updateUsuario(id) {
    console.log(`update ${id}`)
    this.router.navigate(['admin/usuario',id])
  }

  edit(id){
    this.router.navigate(['admin/usuario/', id]);
  }

  novo(){
    this.router.navigate(['admin/usuario', -1]);
  }

  vincularUsuario(id) {    
    this.router.navigate(['admin/usuario/vincular',id])
  }

  pesquisar(){
    this.actualPage = 1;
    this.object_filter.pageNumber = 1;
    this.load();
  }

  load(){
    const filtro = Object.assign(this.object_filter);
    this.usuarioService.list(filtro).subscribe(data=>{
      this.usuarios=data['list'];
      this.totalRecords = data.totalRecords;
    });
  }
}