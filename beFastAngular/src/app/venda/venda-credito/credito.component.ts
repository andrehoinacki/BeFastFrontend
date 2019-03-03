import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/admin/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../admin/usuario/usuario.model';
import { FormaPagamento } from '../forma-pagamento/formapgto.model';
import { FormaPagamentoService } from 'src/app/service/util/forma-pagamento/formapgto.service';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css'],
  providers: [UsuarioService, FormaPagamentoService]
})
export class CreditoComponent implements OnInit {

  mensagem : string;
  usuario : Usuario;
  matricula : number;
  valor : number;
  selectedFormaPgto : FormaPagamento;
  
  selectedFormaPgtoNome : string;

  listFormaPgto = [];

  constructor(
    private usuarioService: UsuarioService,
    private formapgtoService: FormaPagamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFormasPgto();
  }

  loadFormasPgto(){
    this.formapgtoService.list().subscribe(data=>this.listFormaPgto=data);
  }

  getUsuario(){
    this.usuarioService.getByMatricula(this.matricula).subscribe(data=>this.usuario=data);
    console.log(this.usuario.nome);
  }

  saveSaldo() {
    this.usuarioService.salvar(this.usuario).subscribe(data=>{
    this.matricula = null;
    this.valor = null;
    this.usuario = null;  
    this.mensagem = "Saldo atualizado com sucesso!";
      //this.router.navigate(['/admin/usuario']);
    });
  }
}
