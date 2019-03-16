import { Usuario } from "src/app/admin/usuario/usuario.model";
import { FormaPagamento } from "../forma-pagamento/formapgto.model";
import { ItemVenda } from "./item-venda.model";

export class Venda {
    public id : number;
    public dataVenda : Date;        
    public cliente : Usuario;
    public funcionario : Usuario;    
    public itens : Array<ItemVenda> = [];
    public pagamento : FormaPagamento;
    public total : number;
  }