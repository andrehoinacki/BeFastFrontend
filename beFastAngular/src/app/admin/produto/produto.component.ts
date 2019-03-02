import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../service/admin/produto/produto.service';
import { RestricaoService } from '../../service/admin/restricao/restricao.service';
import { CategoriaService } from '../../service/admin/categoria/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto/produto.model';
import { Restricao } from '../restricao/restricao.model';
import { Categoria } from '../categoria/categoria.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  providers: [ProdutoService, RestricaoService, CategoriaService]
})
export class ProdutoComponent implements OnInit {

  message: string;
  id:number;
  produto: Produto;
  username:string;
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
    private categoriaService : CategoriaService
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

  loadRestricoes(){
    this.restricaoService.list().subscribe(data=>this.listRestricao=data);
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
    this.produto.restricoes = this.selectedRestricao;
    this.produto.categoria = this.selectedCategoria;
    this.produtoService.salvar(this.produto).subscribe(data=>{
      this.message = "Produto salvo com sucesso!";
      this.router.navigate(['/admin/produto']);
    });
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
}
