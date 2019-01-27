import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isUserLoggedIn = false;  

  constructor(private autentificacaoService: AutenticacaoService) { }

  ngOnInit() {
    // this.isUserLoggedIn = this.autentificacaoService.isUserLoggedIn();
  }

}
