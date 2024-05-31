import { Component } from '@angular/core';
import { ToDoListService } from '../../services/to-do-list.service';
import { iTodosWithUsers } from '../../interfaces/todos-with-users';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss',
})
export class CompletedComponent {
  todosWithUsersArray: iTodosWithUsers[] = [];

  constructor(private todolistService: ToDoListService) {}

  ngOnInit() {
    this.todolistService.todosCompletedTrue$.subscribe((data) => {
      this.todosWithUsersArray = data;
    });

    this.todolistService.searchTerm$.subscribe((term) => {
      if (term) {
        this.todosWithUsersArray = this.todolistService.todosSearchedArray;
      } else {
        this.todosWithUsersArray = this.todolistService.todosCompletedTrueArray;
      }
    });

    this.todolistService.getTodosWithUsersFilteredByCompleted(true);
  }
}
