import { Usuario } from "src/app/admin/usuario/usuario.model";
import { FormaPagamento } from "../forma-pagamento/formapgto.model";

export class Venda {
    public id : number;
    public dataVenda : Date;        
    public cliente : Usuario;
    public funcionario : Usuario;    
    public itens : Array<any> = [];
    public pagamento : FormaPagamento;
  }