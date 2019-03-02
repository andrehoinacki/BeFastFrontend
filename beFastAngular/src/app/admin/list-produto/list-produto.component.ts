import { ProdutoService } from '../../service/admin/produto/produto.service';
import { ProdutoFilter } from './produto.filter';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../produto/produto.model';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css'],
  providers: [ProdutoService]
})
export class ListProdutoComponent implements OnInit {

  produtos: Produto[]

  message: string;
  descricao: string;
  totalRecords: number;
  actualPage : number = 1;
  pageSize : number = 10;

  object_filter : ProdutoFilter = new ProdutoFilter;

  constructor(
    private produtoService : ProdutoService,
    private router : Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.load();   
  }

  pageChanged(event) {
    this.actualPage = event;
    this.object_filter.pageNumber = event;
    this.load();
  }

  deleteProduto(id) {
    this.produtoService.deleteProduto(id).subscribe (
      response => {
        this.message = `Produto deletado com sucesso`;
        this.load();
      }
    )
  }

  updateProduto(id) {
    this.router.navigate(['admin/produto',id])
  }

  edit(id){
    this.router.navigate(['admin/produto/', id]);
  }

  novo(){
    this.router.navigate(['admin/produto', -1]);
  }

  pesquisar(){
    this.actualPage = 1;
    this.object_filter.pageNumber = 1;
    this.load();
  }

  load(){
    const filtro = Object.assign(this.object_filter);
    this.produtoService.list(filtro).subscribe(data=>{
      this.produtos=data['list'];
      this.totalRecords = data.totalRecords;
    });
  }
}