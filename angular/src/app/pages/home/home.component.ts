import { Component } from '@angular/core';
import { ToDoListService } from '../../services/to-do-list.service';
import { iTodosWithUsers } from '../../interfaces/todos-with-users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  todosWithUsersArray: iTodosWithUsers[] = [];

  constructor(private todolistService: ToDoListService) {}

  ngOnInit() {
    this.todolistService.todoWithUsers$.subscribe((data) => {
      this.todosWithUsersArray = data;
    });

    this.todolistService.searchTerm$.subscribe((term) => {
      if (term) {
        this.todosWithUsersArray = this.todolistService.todosSearchedArray;
      } else {
        this.todosWithUsersArray = this.todolistService.todoWithUsersArray;
      }
    });

    this.todolistService.getTodosWithUsers();
  }
}
