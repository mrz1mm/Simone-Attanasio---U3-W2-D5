import { Component } from '@angular/core';
import { iUsersWithTodos } from '../../interfaces/users-with-todos';
import { ToDoListService } from '../../services/to-do-list.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  todosWithUsersArray: iUsersWithTodos[] = [];

  constructor(private todolistService: ToDoListService) {}

  ngOnInit() {
    this.todolistService.usersWithTodos$.subscribe((data) => {
      this.todosWithUsersArray = data;
    });

    this.todolistService.searchTerm$.subscribe((term) => {
      if (term) {
        this.todosWithUsersArray = this.todolistService.userSearchedArray;
      } else {
        this.todosWithUsersArray = this.todolistService.usersWithTodosArray;
      }
    });

    this.todolistService.getUsersWithTodos();
  }
}
