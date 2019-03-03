import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/admin/usuario/usuario.service';
import { RoleService } from '../../service/admin/role/role.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario.model';
import { Role } from '../role/role.model';
import { RestricaoService } from 'src/app/service/admin/restricao/restricao.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService, RoleService]
})
export class UsuarioComponent implements OnInit {

  id:number;
  usuario: Usuario;
  username:string;
  selectedRole : Role;
  selectedRestricao : Array<any>;
  selectedRoleNome : string;

  listRole = [];
  listRestricao = [];
  

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router, 
    private restricaoService : RestricaoService, 
    private roleService : RoleService
  ) { }

  ngOnInit() {

    this.loadRoles();
    this.loadRestricoes();
    this.id = this.route.snapshot.params['id'];

    this.selectedRestricao = [];

    this.usuario = new Usuario();
    //this.usuario.id = this.id;

    console.log("ID " + this.id)
    
    this.route.paramMap.subscribe(params => {
      if(this.id != -1){
        this.usuario.id = this.id;
        this.get();
      }
    });
  }

  loadRoles(){
    this.roleService.list().subscribe(data=>this.listRole=data);
  }

  loadRestricoes(){
    this.restricaoService.list().subscribe(data=>this.listRestricao=data);
  }

  get(){

    this.usuarioService.get(this.id).subscribe(data=>{
      this.usuario = data;
      this.selectedRole = data.role;
      this.selectedRoleNome = data.role.nome;
      this.selectedRestricao = data.restricoes;
      this.listRestricao.forEach(rest => {
        this.selectedRestricao.forEach(restSelected =>{
          if(rest.id == restSelected.id){
            rest.checked = true;
          }
        });
      });
    });

  }
  
  saveUsuario() {
    this.usuario.role = this.selectedRole;
    this.usuario.restricoes = this.selectedRestricao;
    this.usuarioService.salvar(this.usuario).subscribe(data=>{
      //this.messageService.openSuccessMessage(translate['FORM_SUCCESS']);
      this.router.navigate(['/admin/usuario']);
    });
  }

  // Radio Change Event
  onItemChange(item){
    console.log(item)
    this.selectedRole = item;
    this.selectedRoleNome = item.nome;
  }

  // Checkbox Change Event
  onItemChangeRestricao(item){
    const index = this.selectedRestricao.findIndex(x => x.id==item.id);
    if(index > -1){
      this.selectedRestricao.splice(index, 1);
     } else {
      this.selectedRestricao.push(item);
    }
  }

  cancelar(){
    this.router.navigate(['admin/usuario']);
  }

  restricoes(){
    this.router.navigate(['admin/usuario']);
  }
}
