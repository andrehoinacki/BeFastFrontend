import { TodoComponent } from './todo/todo.component';
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { ListUsuarioComponent } from './admin/list-usuario/list-usuario.component';
import { UsuarioComponent } from './admin/usuario/usuario.component';
import { ListProdutoComponent } from './admin/list-produto/list-produto.component';
import { ProdutoComponent } from './admin/produto/produto.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { CreditoComponent } from './venda/venda-credito/credito.component';
import { VendaProdutoComponent } from './venda/venda-produto/venda-produto.component';
import { VincularUsuarioComponent } from './admin/vincular-usuario/vincular-usuario.component';
import { ConsultaSadoComponent } from './aluno/consulta-saldo.component';
import { ListAlunosComponent } from './responsavel/list-alunos/list-alunos.component';
import { ListVendasComponent } from './relatorio/vendas/list-vendas.component';
import { CreditoBoletoComponent } from './venda/credito-boleto/credito-boleto.component';
import { ListRecebiveisComponent } from './relatorio/recebiveis/list-recebiveis.component';
import { UpdateRestricaoComponent } from './responsavel/update-restricao/update-restricao.component';
import { ConsumoComponent } from './responsavel/consumo/consumo.component';
import { RetornoBancoComponent } from './venda/retorno-banco/retorno-banco.component';
import { HistoricoCreditoComponent } from './responsavel/historico-credito/historico-credito.component';
import { ListFilialComponent } from './admin/list-filial/list-filial.component';
import { FilialComponent } from './admin/filial/filial.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'erro', component:ErrorComponent},
  
  {
    path : 'welcome/:name',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']},
    component : WelcomeComponent, 
    canActivate : [RouteGuardService]
  },
  {
    path : 'aluno/:name',
    data: { expectedRole: ['ROLE_ALUNO']},
    component : ConsultaSadoComponent, 
    canActivate : [RouteGuardService]
  },
  {
    path : 'responsavel/:name',
    data: { expectedRole: ['ROLE_RESPONSAVEL']},
    component : ListAlunosComponent, 
    canActivate : [RouteGuardService]
  },
  {
    path : 'responsavel/updaterestricao/:id',
    data: { expectedRole: ['ROLE_RESPONSAVEL']},
    component : UpdateRestricaoComponent, 
    canActivate : [RouteGuardService]
  },
  {
    path : 'responsavel/historicoconsumo/:id',
    data: { expectedRole: ['ROLE_RESPONSAVEL']},
    component : ConsumoComponent, 
    canActivate : [RouteGuardService]
  },
  {
    path : 'responsavel/historicocredito/:id',
    data: { expectedRole: ['ROLE_RESPONSAVEL']},
    component : HistoricoCreditoComponent, 
    canActivate : [RouteGuardService]
  },   
  { 
    path : 'todos',
    data: { expectedRole: ['ROLE_ADMIN']}, 
    component : ListTodosComponent, 
    canActivate : [RouteGuardService] 
  },

  { 
    path : 'admin/usuario',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : ListUsuarioComponent, 
    canActivate : [RouteGuardService] 
  },

  { 
    path : 'admin/usuario/:id',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : UsuarioComponent, 
    canActivate : [RouteGuardService] 
  },

  { 
    path : 'admin/produto',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : ListProdutoComponent, 
    canActivate : [RouteGuardService] 
  },
  { 
    path : 'admin/produto/:id',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : ProdutoComponent, 
    canActivate : [RouteGuardService] 
  },
  { 
    path : 'venda/credito',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : CreditoComponent, 
    canActivate : [RouteGuardService] 
  },
  { 
    path : 'venda/produto',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : VendaProdutoComponent, 
    canActivate : [RouteGuardService] 
  },
  { 
    path : 'admin/usuario/vincular/:id',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : VincularUsuarioComponent, 
    canActivate : [RouteGuardService] 
  },  
  { 
    path : 'relatorio/vendas',
    data: { expectedRole: ['ROLE_ADMIN']}, 
    component : ListVendasComponent, 
    canActivate : [RouteGuardService] 
  },
  { 
    path : 'venda/credito/boleto/:id',
    data: { expectedRole: ['ROLE_RESPONSAVEL']}, 
    component : CreditoBoletoComponent, 
    canActivate : [RouteGuardService] 
  },
  { 
    path : 'relatorio/recebiveis',
    data: { expectedRole: ['ROLE_ADMIN']}, 
    component : ListRecebiveisComponent, 
    canActivate : [RouteGuardService] 
  },
  { 
    path : 'vendas/boleto/retorno',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']},
    component : RetornoBancoComponent, 
    canActivate : [RouteGuardService] 
  },
  
  { 
    path : 'admin/filial',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : ListFilialComponent, 
    canActivate : [RouteGuardService] 
  },

  { 
    path : 'admin/filial/:id',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO']}, 
    component : FilialComponent, 
    canActivate : [RouteGuardService] 
  },


  
  {path:'logout', component:LogoutComponent, canActivate : [RouteGuardService]},
  { path: 'todos/:id', component: TodoComponent, canActivate:[RouteGuardService] },
  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
