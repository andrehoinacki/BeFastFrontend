import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number
  todo: Todo
  username:string

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    
    this.todo = new Todo(this.id,'',false,new Date());

    // this.username = JSON.parse(localStorage.getItem('usuario'));
        
    if(this.id!=-1) {
      let username = sessionStorage.getItem('authenticaterUser')
      this.todoService.retrieveTodo(username, this.id)
          .subscribe (
            data => this.todo = data
          )
    }
  }

  saveTodo() {
    let username = sessionStorage.getItem('authenticaterUser')
    if(this.id == -1) { //=== ==
      this.todoService.createTodo(username, this.todo)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['todos'])
            }
          )
    } else {
      this.todoService.updateTodo(username, this.id, this.todo)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['todos'])
            }
          )
    }
  }
}
