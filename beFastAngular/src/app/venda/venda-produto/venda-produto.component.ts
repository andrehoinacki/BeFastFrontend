import { Component, OnInit, ElementRef } from '@angular/core';
import { Venda } from './venda.model';
import { Produto } from 'src/app/admin/produto/produto.model';
import { Usuario } from 'src/app/admin/usuario/usuario.model';
import { UsuarioService } from 'src/app/service/admin/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/service/admin/produto/produto.service';
import { VendaService } from 'src/app/service/venda/venda.service';
import { FormaPagamento } from '../forma-pagamento/formapgto.model';
import { FormaPagamentoService } from 'src/app/service/util/forma-pagamento/formapgto.service';
import { ItemVenda } from './item-venda.model';
import { Saldo } from 'src/app/util/saldo/saldo.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-venda-produto',
  templateUrl: './venda-produto.component.html',
  styleUrls: ['./venda-produto.component.css']
})
export class VendaProdutoComponent implements OnInit {  
  venda: Venda;
  produto: Produto;
  itens : Array<ItemVenda> = [];
  quantidade : number;

  mensagem : string;  
  usuario : Usuario;
  vendedor : Usuario;  
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
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.venda = new Venda();
    this.produto = new Produto();
    this.usuario = new Usuario();
    this.getVendedor();
    this.loadFormasPgto();
  }
  public ngAfterContentInit() {
    setTimeout(() => {
        this.el.nativeElement.focus();
    }, 500);
  }

  loadFormasPgto(){
    this.formapgtoService.list().subscribe(data=>{
      this.listFormaPgto=data; 
      this.listFormaPgto.forEach(fpgto => {
        const index3 = this.listFormaPgto.findIndex(x3 => x3.nome=="Boleto");
        if (index3 > -1){
          this.listFormaPgto.splice(index3, 1);
        }
      });     
    });
  }

  getVendedor(){   
    let vendedorAux = JSON.parse(sessionStorage.getItem('usuarioLogado'))
    this.usuarioService.getByUsername(vendedorAux.username).subscribe(data=> {       
      if (data != null) {
        this.vendedor = data;
      } 
    });    
  }

  getUsuario(){                
    this.usuarioService.getByMatricula(this.usuario.matricula).subscribe(data=> {       
      if (data != null) {
          this.usuario = data;          
          if (data.saldo != null && data.saldo.length > 0) {
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
              }
              if(restrito) {
                this.mensagem = 'O usuário ' + this.usuario.nome + " não pode consumir esse tipo de alimento";
              } else {
                let item = new ItemVenda();
                item.produto = data;
                item.quantidade = (this.quantidade);
                item.valorItem = data.valor;

                // ATUALIZA QUANTIDADE PRODUTO
                item.produto.quantidade = item.produto.quantidade - this.quantidade;

                this.totalCompra = this.totalCompra + (data.valor * this.quantidade);
                this.itens.push(item);
                this.limparCampos();
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
    let hasSaldo = true;
    if(this.selectedFormaPgtoNome == "Carteirinha") {
      if(this.saldo < this.totalCompra) {
        hasSaldo = false;
        this.mensagem = "Saldo insulficiente para realizar a compra!";
        return;
      } else {
        // ATUALIZA SALDO
        let saldo = new Saldo();
        saldo.data = new Date();
        saldo.status = "Creditado";
        saldo.credito = -this.totalCompra;
        this.usuario.saldo.push(saldo);
      }
    } 
    if(hasSaldo) {
      this.venda.itens = this.itens;
      this.venda.cliente = this.usuario;
      this.venda.funcionario = this.vendedor;
      this.venda.dataVenda = new Date();
      this.venda.pagamento = this.selectedFormaPgto;
      this.venda.total = this.totalCompra;
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
    this.totalCompra = 0;
    this.produto = new Produto();
    this.selectedFormaPgtoNome = '';
    this.selectedFormaPgto = new FormaPagamento();
  }

  limparCampos(){
    this.venda = new Venda();
    this.produto = new Produto();
    this.limparMensagem();
  }

  limparMensagem() {
    this.mensagem = undefined;
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
    else if( tmp.length == 4 || tmp.length == 3) {
      tmp = tmp.concat("0");
    }    

    return tmp;
  }
}
