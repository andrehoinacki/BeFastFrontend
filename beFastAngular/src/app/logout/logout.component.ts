import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private autenticacaoService : AutenticacaoService) { }

  ngOnInit() {
    this.autenticacaoService.logout();
  }

}
