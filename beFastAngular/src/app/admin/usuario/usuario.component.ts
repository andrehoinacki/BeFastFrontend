import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/admin/usuario/usuario.service';
import { RoleService } from '../../service/admin/role/role.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/usuario.model';
import { Role } from '../role/role.model';

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
  
  selectedRoleNome : string;

  listRole = [];
  

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router, 
    private roleService : RoleService
  ) { }

  ngOnInit() {

    this.loadRoles();
    
    this.id = this.route.snapshot.params['id'];

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

  get(){

    this.usuarioService.get(this.id).subscribe(data=>{
      this.usuario = data;
      this.selectedRole = data.role;
    });

  }
  
  saveUsuario() {
/*     let username = sessionStorage.getItem('authenticaterUser')
    this.roleService.getRoleByNome(this.selectedRole).subscribe(data=>{
      this.usuario.role = data;
    }); */
    this.usuario.role = this.selectedRole;
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
}
