import { Produto } from "src/app/admin/produto/produto.model";

export class ItemVenda {
    public id : number;
    public produto : Produto;        
    public quantidade : number;
    public valor : number;
  }