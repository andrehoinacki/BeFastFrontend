import { Component, OnInit } from '@angular/core';
import { Endereco } from '../endereco/endereco.model';
import { FilialService } from 'src/app/service/admin/filial/filial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Filial } from './filial.model';

@Component({
  selector: 'app-filial',
  templateUrl: './filial.component.html',
  styleUrls: ['./filial.component.css']
})
export class FilialComponent implements OnInit {

  id:number;
  filial: Filial;    
  selectedEndereco : Endereco;
  isSelecionado : boolean
  
  constructor(
    private filialService: FilialService,
    private route: ActivatedRoute,
    private router: Router,         
  ) { }

  ngOnInit() {   
    this.id = this.route.snapshot.params['id'];
    
    this.filial = new Filial();
    this.selectedEndereco = new Endereco();

    console.log("ID " + this.id)
    
    this.route.paramMap.subscribe(params => {
      if(this.id != -1){
        this.filial.id = this.id;
        this.get();
      }
    });    
  }
  
  get(){

    this.filialService.get(this.id).subscribe(data=>{      
      this.filial = data;
      this.selectedEndereco = data.endereco;      
    });    
  }
  
  saveFilial() {
    this.filial.endereco = this.selectedEndereco;    
    this.filialService.salvar(this.filial).subscribe(data=>{      
      this.router.navigate(['/admin/filial']);
    });
  }
    
  cancelar(){
    this.router.navigate(['admin/filial']);
  }

}
