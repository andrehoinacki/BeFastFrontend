import { Component, OnInit } from '@angular/core';
import { Venda } from './venda.model';
import { Produto } from 'src/app/admin/produto/produto.model';
import { Usuario } from 'src/app/admin/usuario/usuario.model';
import { UsuarioService } from 'src/app/service/admin/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/service/admin/produto/produto.service';
import { VendaService } from 'src/app/service/venda/venda.service';
import { FormaPagamento } from '../forma-pagamento/formapgto.model';
import { FormaPagamentoService } from 'src/app/service/util/forma-pagamento/formapgto.service';

@Component({
  selector: 'app-venda-produto',
  templateUrl: './venda-produto.component.html',
  styleUrls: ['./venda-produto.component.css']
})
export class VendaProdutoComponent implements OnInit {  
  venda: Venda;
  produto: Produto;
  itens : Array<any> = [];
  quantidade : number;

  mensagem : string;  
  usuario : Usuario;  
  hasUsuario : boolean = false;

  saldo : number = 0; 
  nomeAluno : string;
  somaCaloria : number = 0;
  totalCompra : number = 0;

  selectedFormaPgto : FormaPagamento;  
  selectedFormaPgtoNome : string;
  listFormaPgto = [];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router, 
    private produtoService : ProdutoService,
    private vendaService: VendaService,
    private formapgtoService: FormaPagamentoService,
  ) { }

  ngOnInit() {
    this.venda = new Venda();
    this.produto = new Produto();
    this.usuario = new Usuario();
    this.loadFormasPgto();
  }

  loadFormasPgto(){
    this.formapgtoService.list().subscribe(data=>{
      this.listFormaPgto=data;      
    });
  }

  getUsuario(){                
    this.usuarioService.getByMatricula(this.usuario.matricula).subscribe(data=> {       
      if (data != null) {
          this.usuario = data;          
          if (data.saldo != null && data.saldo.lenght > 0) {
            this.usuario.saldo.forEach(saldo => {
              if(saldo.status != "Pendente"){
                this.saldo = this.saldo + saldo.credito;
              }
            });
          } else {            
            this.saldo = 0; 
          }
          this.nomeAluno = data.nome;
          this.hasUsuario = true;
      } 
    });    
  }

  getProduto(){ 
    this.limparMensagem();      
    this.quantidade = this.produto.quantidade;
    console.log('aqui'+this.quantidade);
    console.log(this.produto.codigo);
    if (this.quantidade == null) {
      this.mensagem = 'É necessário inserir uma quantidade para a venda.';
    } else if (this.produto.codigo == null) {
      this.mensagem = 'É necessário selecionar um produto para a venda.';
    } else if (this.usuario.id == null) {
      this.mensagem = 'É necessário selecionar um cliente para a venda.';
    } else {   
      this.produtoService.getByCodigo(this.produto.codigo).subscribe(data=> {       
        if (data != null) {
          console.log(data.descricao);
          let restrito = false;
          if(this.usuario.restricoes != undefined
            && this.usuario.restricoes != null
            && this.usuario.restricoes.length > 0){
              if(data.restricoes != undefined
                && data.restricoes !== null
                && data.restricoes.length > 0){
                  this.usuario.restricoes.forEach(restricao => {
                    data.restricoes.forEach(prodrest => {
                      if(restricao.id == prodrest.id && restricao.nome != 'CALORICA') {
                        restrito = true;
                        return;
                      }
                      if(restricao.id == prodrest.id && restricao.nome == 'CALORICA'){
                        this.somaCaloria = this.somaCaloria + (data.valorCalorico * this.quantidade);
                        restrito = this.usuario.valorCalorico < this.somaCaloria;
                        return;
                      }
                    });
                  });
                  if(restrito) {
                    this.mensagem = 'O usuário ' + this.usuario.nome + " não pode consumir esse tipo de alimento";
                  } else {
                    data.quantidade = this.quantidade;
                    this.totalCompra = this.totalCompra + (data.valor * this.quantidade);
                    this.itens.push(data);
                    this.limparCampos();
                  }
              }
            }
          
          
        } else {
          this.mensagem = "Produto não encontrado!"
        }
      });    
    }
  }

  finalizarVenda() {
    this.limparMensagem();
    if(this.selectedFormaPgtoNome == "Carteirinha") {
      if(this.saldo < this.totalCompra) {
        this.mensagem = "Saldo insulficiente para realizar a compra!";
        return;
      }
    } else {
      this.venda.itens = this.itens;
      this.venda.cliente = this.usuario;
      this.venda.funcionario = this.usuario;
      this.venda.dataVenda = new Date();
      this.venda.pagamento = this.selectedFormaPgto;
      this.vendaService.salvar(this.venda).subscribe(data=>{      
        this.cancelarVenda();
      });
    }
  }

  // Radio Change Event
  onItemChange(item){
    this.selectedFormaPgto = item;
    this.selectedFormaPgtoNome = item.nome;
  }

  retirarProduto(index, produtoExcluir){
    this.totalCompra = this.totalCompra - (produtoExcluir.valor * produtoExcluir.quantidade);
    if(this.somaCaloria > 0) {
      this.somaCaloria = this.somaCaloria - (produtoExcluir.valorCalorico * produtoExcluir.quantidade);
    }    
    this.itens.splice(index, 1);
  }

  cancelarVenda(){
    this.venda = new Venda();
    this.itens = [];
    this.usuario = new Usuario();
    this.hasUsuario = false;
    this.nomeAluno = '';
    this.saldo = 0;
    this.produto = new Produto();
    this.selectedFormaPgtoNome = '';
    this.selectedFormaPgto = new FormaPagamento();
    this.listFormaPgto = [];
  }

  limparCampos(){
    this.venda = new Venda();        
    this.saldo = 0;
    this.produto = new Produto();
    this.limparMensagem();
  }

  limparMensagem() {
    this.mensagem = undefined;
  }
}
