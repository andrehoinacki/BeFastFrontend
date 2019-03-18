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
  isResponsavel : boolean = true;
  usuarios = []
  nomeAluno : string;
  mensagem : string;
  jaInserido : boolean = false;

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
  }

  get(){
    this.usuarioService.get(this.id).subscribe(data=>{      
      this.usuario = data; 
      this.usuarios = data.usuarios;
      if (data.role.nome == 'ROLE_RESPONSAVEL') {
        this.isResponsavel = false;
      }     
      console.log(data.role.nome + this.isResponsavel);
    });    
  }

  getUsuario(){            
    this.usuarioService.getByMatricula(this.matricula).subscribe(data=> {       
      if (data != null) {
        this.usuarios.forEach(rest => {
          if (data.id == rest.id) {
            this.jaInserido = true;            
          }
        });    
        if (this.jaInserido) {
          this.mensagem = "Usuário já inserido";
          this.hasUsuario = false;
        } else if (data.id == this.id) {
          this.mensagem = "Não é possível vincular o mesmo usuário da edição";
          this.hasUsuario = false;
        } else if (data.role.nome != 'ROLE_ALUNO') {
          this.mensagem = "Não é possível vincular um usuário com perfil diferente de 'ROLE_ALUNO'";
          this.hasUsuario = false;
        } else {
          this.nomeAluno = data.nome;
          this.usuarios.push(data);
          this.hasUsuario = true;
          this.matricula = null;
        }
      } else {
        this.mensagem = "Usuário não encontrado";
        this.hasUsuario = false;
      }      
            
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
    this.usuarioService.salvar(this.usuario).subscribe(data=>{      
      this.router.navigate(['/admin/usuario']);
    });
  }
  
}
