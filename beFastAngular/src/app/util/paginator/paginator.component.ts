import { Component, Input, OnInit, EventEmitter, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})

export class PaginatorComponent implements  OnInit, OnChanges {
    @Input() totalElements :number = 1;
    @Input() actualPage :number = 1;
    @Input() pageSize :number = 5;
    numpages : number = 0;
    pages: any[] = [];

    @Output() pageChanged = new EventEmitter();

    pag_can_go_first : boolean = false;
    pag_can_go_last : boolean = false;

    constructor() {
        
    }


    ngOnChanges(changes: any) {
        this.calcPages();
    }

    calcPages(){

        this.pages = [];
        //salva num de páginas
        this.numpages = Math.ceil(this.totalElements/this.pageSize);

        for(let i=1; i <= this.numpages; i++) {
            this.pages.push(i);
        }

        this.enableDisableButtons();
    }

    ngOnInit() {
        this.calcPages();
    }

    enableDisableButtons(){
        //se tiver mais de uma página
        if(this.numpages > 1){

            //se pagina atual for maior que um já habilita primeira e anterior
            if(this.actualPage > 1){
                this.pag_can_go_first = true;
            }else{
                this.pag_can_go_first = false;
            }

            //se página for maior ou igual total desabilita ultima e próxima
            if(this.actualPage >= this.numpages){
                this.pag_can_go_last = false;
            }else{
                this.pag_can_go_last = true;
            }

        }
    }

    goFirstPage() {
        this.actualPage=1;
        this.pageChanged.emit(this.actualPage);
    }

    goPage(page: number) {
        this.actualPage=page;
        this.pageChanged.emit(this.actualPage);
    }

    goLastPage() {
        this.actualPage=this.numpages;
        this.pageChanged.emit(this.actualPage);
    }




}
