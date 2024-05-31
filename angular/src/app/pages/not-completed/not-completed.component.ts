import { Component } from '@angular/core';
import { ToDoListService } from '../../services/to-do-list.service';
import { iTodosWithUsers } from '../../interfaces/todos-with-users';

@Component({
  selector: 'app-not-completed',
  templateUrl: './not-completed.component.html',
  styleUrl: './not-completed.component.scss',
})
export class NotCompletedComponent {
  todosWithUsersArray: iTodosWithUsers[] = [];

  constructor(private todolistService: ToDoListService) {}

  ngOnInit() {}
}
