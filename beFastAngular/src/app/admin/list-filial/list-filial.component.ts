import { Component, OnInit } from '@angular/core';
import { Filial } from '../filial/filial.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FilialService } from 'src/app/service/admin/filial/filial.service';

@Component({
  selector: 'app-list-filial',
  templateUrl: './list-filial.component.html',
  styleUrls: ['./list-filial.component.css']
})
export class ListFilialComponent implements OnInit {

  filiais: Filial[]

  message: string
  
  constructor(
    private filialService : FilialService,
    private router : Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.load();   
  }
  
  deleteFilial(id) {
    let username = sessionStorage.getItem('authenticaterUser')
    this.filialService.deleteUsuario(id).subscribe (
      response => {
        this.message = `Usuário deletado com sucesso`;
        this.load();
      }
    )
  }

  updateFilial(id) {
    console.log(`update ${id}`)
    this.router.navigate(['admin/filial',id])
  }

  edit(id){
    this.router.navigate(['admin/filial/', id]);
  }

  novo(){
    this.router.navigate(['admin/filial', -1]);
  }

  load(){    
    this.filialService.list().subscribe(data=>{
      this.filiais=data;      
    });
  }

}
