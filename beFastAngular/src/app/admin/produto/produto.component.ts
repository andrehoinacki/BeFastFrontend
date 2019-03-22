import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../service/admin/produto/produto.service';
import { RestricaoService } from '../../service/admin/restricao/restricao.service';
import { CategoriaService } from '../../service/admin/categoria/categoria.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Produto } from '../produto/produto.model';
import { Categoria } from '../categoria/categoria.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  providers: [ProdutoService, RestricaoService, CategoriaService]
})
export class ProdutoComponent implements OnInit {
  
  id:number;
  mensagem: string;
  produto: Produto;
  selectedRestricao : Array<any>;
  selectedCategoria : Categoria;
  
  selectedCategoriaNome : string;

  listRestricao = [];
  listCategoria = [];
  

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router, 
    private restricaoService : RestricaoService, 
    private categoriaService : CategoriaService,
    private el: ElementRef
  ) { }

  ngOnInit() {

    this.loadRestricoes();
    this.loadCategorias();
    
    this.id = this.route.snapshot.params['id'];

    this.produto = new Produto();
    this.selectedRestricao = [];

    this.route.paramMap.subscribe(params => {
      if(this.id != -1){
        this.produto.id = this.id;
        this.get();
      }
    });
  }

  public ngAfterContentInit() {
    setTimeout(() => {
        this.el.nativeElement.focus();
    }, 500);
  }

  loadRestricoes(){
    this.restricaoService.list().subscribe(data=>{
      data.forEach(restricao => {
        const index = data.findIndex(x => restricao.nome=="CALORICA");
        if(index > -1){
          data.splice(index, 1);
        }
      });
      this.listRestricao=data;
    });
  }

  loadCategorias(){
    this.categoriaService.list().subscribe(data=>this.listCategoria=data);
  }

  get(){
    this.produtoService.get(this.id).subscribe(data=>{
      this.produto = data;
      this.selectedRestricao = data.restricoes;
      this.listRestricao.forEach(rest => {
        this.selectedRestricao.forEach(restSelected =>{
          if(rest.id == restSelected.id){
            rest.checked = true;
          }
        });
      });
      this.selectedCategoria = data.categoria;
      this.selectedCategoriaNome = data.categoria.nome;
    });
  }
  
  saveProduto() {
    this.limparMensagem();
    if(!this.validaProduto()) {
      return;
    }
    this.produto.restricoes = this.selectedRestricao;
    this.produto.categoria = this.selectedCategoria;
    this.produtoService.salvar(this.produto).subscribe(data=>{
      this.mensagem = "Produto salvo com sucesso!";
      this.router.navigate(['/admin/produto']);
    });
  }
  validaProduto(): boolean {
    this.limparMensagem();
    if(this.produto.codigo == null){
      this.mensagem = "O Código é obrigatório!";
      return false;
    }
    if(this.produto.descricao == null){
      this.mensagem = "A descrição é obrigatória!";
      return false;
    }
    if(this.produto.quantidade == null || this.produto.quantidade == 0){
      this.mensagem = "A quantidade é obrigatória e deve ser maior que zero!";
      return false;
    }

    if(this.produto.valor == null || this.produto.valor == 0){
      this.mensagem = "O valor é obrigatório e deve ser maior que zero!";
      return false;
    }

    if(this.produto.valorCalorico == null || this.produto.valorCalorico == 0){
      this.mensagem = "O valor calórico é obrigatório e deve ser maior que zero!";
      return false;
    }
    return true;
  }

  limparMensagem() {
    this.mensagem = undefined;
  }

  // Checkbox Change Event
  onItemChangeRestricao(item){
    const index = this.selectedRestricao.findIndex(x => x.id==item.id);
    if(index > -1){
      this.selectedRestricao.splice(index, 1);
     } else {
      this.selectedRestricao.push(item);
    }
  }

  // Radio Change Event
  onItemChangeCategoria(item){
    this.selectedCategoria = item;
    this.selectedCategoriaNome = item.nome;
  }

  cancelar(){
    this.router.navigate(['admin/produto']);
  }
}
