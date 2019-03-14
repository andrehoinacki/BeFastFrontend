import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/admin/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { RestricaoService } from 'src/app/service/admin/restricao/restricao.service';
import { Usuario } from 'src/app/admin/usuario/usuario.model';

@Component({
  selector: 'app-update-restricao',
  templateUrl: './update-restricao.component.html',
  styleUrls: ['./update-restricao.component.css'],
  providers: [UsuarioService]
})
export class UpdateRestricaoComponent implements OnInit {

  id:number;
  usuario: Usuario;
  selectedRestricao : Array<any>;
  isCalorico : boolean
  isSelecionado : boolean

  listRestricao = [];
  

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router, 
    private restricaoService : RestricaoService
  ) { }

  ngOnInit() {

    console.log("Estou no update");
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

  loadRestricoes(){
    this.restricaoService.list().subscribe(data=>this.listRestricao=data);
  }

  get(){

    this.usuarioService.get(this.id).subscribe(data=>{      
      this.usuario = data;
      this.selectedRestricao = data.restricoes;
      this.listRestricao.forEach(rest => {
        this.selectedRestricao.forEach(restSelected =>{
          if(rest.id == restSelected.id){
            console.log(rest.nome);
            rest.checked = true;
            if (rest.nome == 'CALORICA') {
              this.isCalorico = true;
            } 
          }                 
        });
      });
    });    
  }
  
  saveUsuario() {
    this.usuario.restricoes = this.selectedRestricao;
    this.usuarioService.salvar(this.usuario).subscribe(data=>{
      //this.messageService.openSuccessMessage(translate['FORM_SUCCESS']);
      this.router.navigate(['responsavel', ""])
    });
  }

  // Checkbox Change Event
  onItemChangeRestricao(item){    
    const index = this.selectedRestricao.findIndex(x => x.id==item.id);    
    const nome = item.nome; 
      
    // item.checked = !item.checked;        
    if(index > -1){
      this.selectedRestricao.splice(index, 1);      
      this.isSelecionado = false;
     } else {
      this.selectedRestricao.push(item);
      this.isSelecionado = true;
    }            
    if (nome == 'CALORICA' && this.isSelecionado) {
      this.isCalorico = true;      
    } else if (nome == 'CALORICA' && !this.isSelecionado){
      this.isCalorico = false;
    }         
  }

  cancelar(){
    this.router.navigate(['responsavel', ""]);
  }
 
}
