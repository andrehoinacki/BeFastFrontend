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

  refreshUsuario(){
    let username = sessionStorage.getItem('authenticaterUser')
    this.usuarioService.retrieveAllTodos(username).subscribe(
      response => {
        console.log(response);
        this.usuarios = response;
      }
    )
  }

  deleteUsuario(id) {
    let username = sessionStorage.getItem('authenticaterUser')
    console.log(`delete todo ${id}` )
    this.usuarioService.deleteUsuario(username, id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshUsuario();
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