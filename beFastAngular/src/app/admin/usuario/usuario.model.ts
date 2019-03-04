import { Role } from "../role/role.model";

export class Usuario {
    public id : number;
    public nome : string;
    public username : string;
    public password : string;
    public role : Role
    public restricoes : Array<any> = [];
    public valorCalorico : number;
  }