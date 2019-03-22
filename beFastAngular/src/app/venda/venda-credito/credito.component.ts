import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/admin/usuario/usuario.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Usuario } from '../../admin/usuario/usuario.model';
import { FormaPagamento } from '../forma-pagamento/formapgto.model';
import { FormaPagamentoService } from 'src/app/service/util/forma-pagamento/formapgto.service';
import { Saldo } from '../../util/saldo/saldo.model';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.css'],
  providers: [UsuarioService, FormaPagamentoService]
})
export class CreditoComponent implements OnInit {

  mensagem : string;
  usuario : Usuario;
  matricula : string;
  saldo : Saldo;
  saldoAtual : number = 0;
  hasUsuario : boolean = false;
  selectedFormaPgto : FormaPagamento;
  
  selectedFormaPgtoNome : string;

  listFormaPgto = [];

  constructor(
    private usuarioService: UsuarioService,
    private formapgtoService: FormaPagamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.loadFormasPgto();
    this.saldo = new Saldo();
  }

  public ngAfterContentInit() {
    this.setarFocu();
  }

  loadFormasPgto(){
    this.formapgtoService.list().subscribe(data=>{
      this.listFormaPgto=data;
      this.listFormaPgto.forEach(fpgto => {
        const index = this.listFormaPgto.findIndex(x => x.nome=="Carteirinha");
        const index2 = this.listFormaPgto.findIndex(x2 => x2.nome=="Cartão Crédito");
        const index3 = this.listFormaPgto.findIndex(x3 => x3.nome=="Boleto");
        if(index > -1){
          this.listFormaPgto.splice(index, 1);
        } else if (index2 > -1){
          this.listFormaPgto.splice(index2, 1);
        } else if (index3 > -1){
          this.listFormaPgto.splice(index3, 1);
        }
      });
    });
  }

  getUsuario(){
    this.usuarioService.getByMatricula(this.matricula).subscribe(data=> {
      if(data != null) {
        this.limparMensagem();
        this.usuario=data;
        this.hasUsuario = true;
        data.saldo.forEach(saldo => {
          if(saldo.status != "Pendente"){
            this.saldoAtual = this.saldoAtual + saldo.credito;
          }
        });
      } else {
        this.mensagem = "Usuário não encontrado!";
      }

    },
    erro=>{
      this.limpar();
    });
    
  }

  limparMensagem() {
    this.mensagem = undefined;
  }

  saveSaldo() {
    this.limparMensagem();
    if(!this.validarUsuario()){
      return;
    }
    
    alert("continuei");

    if(this.usuario.saldo.length == 0) {
      this.usuario.saldo = [];
    }

    this.saldo.status = "Creditado";
    this.saldo.data = new Date();
    this.usuario.saldo.push(this.saldo);
    this.usuarioService.salvar(this.usuario).subscribe(data=>{
    this.limpar();
    this.mensagem = "Compra realizada com sucesso!";
    });

  }

  validarUsuario(): boolean {
    this.limparMensagem();
    if(this.usuario == null){
      this.mensagem = "Selecione um usuário!";
      return false;
    }
    if(this.saldo.credito == null || this.saldo.credito == 0){
      this.mensagem = "Indique o valor da recarga!";
      return false;
    }
    if(this.selectedFormaPgto == null){
      this.mensagem = "Selecione uma forma de pagamento!";
      return false;
    }
    return true;
  }
  
  limpar() {
    this.matricula = null;
    this.saldo = new Saldo();
    this.usuario = new Usuario();  
    this.hasUsuario = false;
    this.selectedFormaPgto = null;
    this.selectedFormaPgtoNome = null;
    this.saldoAtual = 0;
    this.limparMensagem();
    this.setarFocu();
  }

    // Radio Change Event
    onItemChange(item){
      this.selectedFormaPgto = item;
      this.selectedFormaPgtoNome = item.nome;
    }

    setarFocu() {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 500);
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
      else if( tmp.length == 4 || tmp.length == 3 ) {
        tmp = tmp.concat("0");
      }    
  
      return tmp;
    }
}
