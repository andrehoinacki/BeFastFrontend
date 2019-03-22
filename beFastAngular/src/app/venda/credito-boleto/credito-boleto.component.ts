import { Component, OnInit, ViewChild } from '@angular/core';
import {saveAs} from 'file-saver';
import { FileService } from '../file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/admin/usuario/usuario.model';
import { UsuarioService } from 'src/app/service/admin/usuario/usuario.service';

// const MIME_TYPES = {
//   pdf: 'application/pdf',
//   xls: 'application/vnd.ms-excel',
//   xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetxml.sheet'
// }

@Component({
  selector: 'app-credito-boleto',
  templateUrl: './credito-boleto.component.html',
  styleUrls: ['./credito-boleto.component.css'],
  providers:[FileService]
})
export class CreditoBoletoComponent implements OnInit {
  hasUsuario : boolean;
  matricula : String;
  nomeAluno : String;
  valorCredito : number;
  id:number;
  usuario: Usuario;
  mensagem : string;
  
  constructor(
    private service:FileService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }
     
  ngOnInit() {
    this.usuario = new Usuario();
    this.id = this.route.snapshot.params['id'];        
    this.route.paramMap.subscribe(params => {
      if(this.id != -1){
        this.usuario.id = this.id;
        this.get();
      }
    });   
  }

  downloadFile() {
    this.limparMensagem();
    if(this.valorCredito == null || this.valorCredito == 0)  {
      this.mensagem = "Insira o valor da recarga!"
    }      
    this.service.download(this.matricula, this.valorCredito)
    .subscribe(data => {            
      saveAs(new Blob([data], {type: 'application/pdf'}), 'boleto_download.pdf');
    })
  }

  limparMensagem() {
    this.mensagem = undefined;
  }

  get(){
    this.usuarioService.get(this.id).subscribe(data=>{      
      this.usuario = data;  
      this.hasUsuario = true;
      this.matricula = data.matricula;
      this.nomeAluno = data.nome;      
    });    
  }

  cancelarVenda() {
    this.router.navigate(['responsavel', ""]);
  }
 
}
