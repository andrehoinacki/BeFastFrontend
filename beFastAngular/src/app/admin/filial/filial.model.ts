import { Endereco } from "../endereco/endereco.model";

export class Filial {
    public id : number;
    public razaoSocial : string;
    public nomeFantasia : string;
    public cnpj : string;
    public incricaoEstadual : string;    
    public endereco : Endereco;
  }