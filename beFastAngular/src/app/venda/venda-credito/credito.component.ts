import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../service/admin/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFormasPgto();
    this.saldo = new Saldo();
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
      this.usuario=data;
      this.hasUsuario = true;
      data.saldo.forEach(saldo => {
        if(saldo.status != "Pendente"){
          this.saldoAtual = this.saldoAtual + saldo.credito;
        }
      });
    });
    
  }

  saveSaldo() {
    if(this.selectedFormaPgto == null){
      this.mensagem = "Selecione uma forma de pagamento";
      return false;
    }
    if(this.usuario.saldo.length == 0) {
      this.usuario.saldo = [];
    }

    this.saldo.status = "Creditado";
    this.usuario.saldo.push(this.saldo);
    this.usuarioService.salvar(this.usuario).subscribe(data=>{
    this.limpar();
    this.mensagem = "Saldo atualizado com sucesso!";
      //this.router.navigate(['/admin/usuario']);
    });

  }
  
  limpar() {
    this.matricula = null;
    this.saldo = new Saldo();
    this.usuario = new Usuario();  
    this.hasUsuario = false;
    this.selectedFormaPgto = null;
    this.selectedFormaPgtoNome = null;
    this.mensagem = "";
    this.saldoAtual = 0;
  }

    // Radio Change Event
    onItemChange(item){
      this.selectedFormaPgto = item;
      this.selectedFormaPgtoNome = item.nome;
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
