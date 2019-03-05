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

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'erro', component:ErrorComponent},
  
  {
    path : 'welcome/:name',
    data: { expectedRole: ['ROLE_ADMIN', 'ROLE_FUNCIONARIO', 'ROLE_RESPOSAVEL','ROLE_ALUNO']},
    component : WelcomeComponent, 
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

  {path:'logout', component:LogoutComponent, canActivate : [RouteGuardService]},
  { path: 'todos/:id', component: TodoComponent, canActivate:[RouteGuardService] },
  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
