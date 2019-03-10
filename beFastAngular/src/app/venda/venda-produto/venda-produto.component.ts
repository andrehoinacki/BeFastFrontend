import { Component, OnInit } from '@angular/core';
import { Venda } from './venda.model';
import { Produto } from 'src/app/admin/produto/produto.model';
import { Usuario } from 'src/app/admin/usuario/usuario.model';
import { UsuarioService } from 'src/app/service/admin/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/service/admin/produto/produto.service';
import { VendaService } from 'src/app/service/venda/venda.service';

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

  saldo : number; 
  nomeAluno : string;

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router, 
    private produtoService : ProdutoService,
    private vendaService: VendaService,
  ) { }

  ngOnInit() {
    this.venda = new Venda();
    this.produto = new Produto();
    this.usuario = new Usuario();
  }

  getUsuario(){                
    this.usuarioService.getByMatricula(this.usuario.matricula).subscribe(data=> {       
      if (data != null) {
          this.usuario = data;          
          if (data.saldo != null && data.saldo.lenght > 0) {            
            this.saldo = data.saldo;
          } else {            
            this.saldo = 0; 
          }
          this.nomeAluno = data.nome;
          this.hasUsuario = true;
      } 
    });    
  }

  getProduto(){       
    this.quantidade = this.produto.quantidade;         
    this.produtoService.get(this.produto.codigo).subscribe(data=> {       
      if (data != null) {
        console.log(data.descricao);
        data.quantidade = this.quantidade;
        this.itens.push(data);
      } 
    });    
  }

  finalizarVenda() {
    this.venda.itens = this.itens;
    this.venda.cliente = this.usuario;
    this.venda.funcionario = this.usuario;
    this.venda.data = new Date();
    this.vendaService.salvar(this.venda).subscribe(data=>{
      console.log(data.id);
      this.router.navigate(['/venda/finalizar'], data.id);
    });
  }

  cancelarVenda(){
    this.venda = new Venda();
    this.itens = [];
    this.usuario = new Usuario();
    this.hasUsuario = false;
    this.nomeAluno = '';
    this.saldo = 0;
    this.produto = new Produto();
  }
}
