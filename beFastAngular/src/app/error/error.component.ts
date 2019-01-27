import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  mensagemErro = 'Um erro ocorreu, contate a equipe de suporte!'

  constructor() { }

  ngOnInit() {
  }

}
