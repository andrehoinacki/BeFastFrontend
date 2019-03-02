import { Restricao } from "../restricao/restricao.model";
import { Categoria } from "../categoria/categoria.model";

export class Produto {
    public id : number;
    public codigo : string;
    public descricao : string;
    public categoria : Categoria;
    public valor : number;
    public restricoes : Array<any> = [];
  }