import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/admin/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioFilter } from '../list-usuario/usuario.filter';

@Component({
  selector: 'app-vincular-usuario',
  templateUrl: './vincular-usuario.component.html',
  styleUrls: ['./vincular-usuario.component.css']
})
export class VincularUsuarioComponent implements OnInit {

  id:number;
  usuario : Usuario;
  matricula : string;    
  hasUsuario : boolean = false;
  usuarios: Usuario[] = []

  object_filter : UsuarioFilter = new UsuarioFilter;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router, 
  ) { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.id = this.route.snapshot.params['id'];
    this.route.paramMap.subscribe(params => {
      if(this.id != -1){
        this.usuario.id = this.id;
        this.get();
      }
    }); 
    this.load();   
  }

  get(){
    this.usuarioService.get(this.id).subscribe(data=>{      
      this.usuario = data;      
    });    
  }

  getUsuario(){        
    this.usuarioService.getByMatricula(this.matricula).subscribe(data=> {      
      if (data != null) {
        this.usuarios.push(data);
      }      
      this.hasUsuario = true;      
    });        
  }

  retirarVinculo(index){
    console.log(index);
    this.usuarios.splice(index, 1);
  }
  
  cancelar(){
    this.router.navigate(['admin/usuario']);
  }

  saveUsuario() {    
    this.usuario.usuarios = this.usuarios;
    this.usuarioService.salvar(this.usuario).subscribe(data=>{      
      this.router.navigate(['/admin/usuario']);
    });
  }

  load(){
    const filtro = Object.assign(this.object_filter);
    this.usuarioService.listVinculo(this.usuario.id).subscribe(data=>{
      this.usuarios=data['listVinculo'];      
    });
  }
}
