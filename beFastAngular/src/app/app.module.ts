import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { UsuarioComponent } from './admin/usuario/usuario.component';
import { ListUsuarioComponent } from './admin/list-usuario/list-usuario.component';
import { ProdutoComponent } from './admin/produto/produto.component';
import { ListProdutoComponent } from './admin/list-produto/list-produto.component';
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { PaginatorComponent } from './util/paginator/paginator.component';
import { CreditoComponent } from './venda/venda-credito/credito.component';
import { VendaProdutoComponent } from './venda/venda-produto/venda-produto.component';
import { VincularUsuarioComponent } from './admin/vincular-usuario/vincular-usuario.component';
import { ConsultaSadoComponent } from './aluno/consulta-saldo.component';
import { FinalizarVendaComponent } from './venda/finalizar-venda/finalizar-venda.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    WelcomeComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    ListTodosComponent,
    UsuarioComponent,
    ListUsuarioComponent,
    ProdutoComponent,
    ListProdutoComponent,
    PaginatorComponent,
    CreditoComponent,    
    VendaProdutoComponent, 
    VincularUsuarioComponent, 
    ConsultaSadoComponent, FinalizarVendaComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
