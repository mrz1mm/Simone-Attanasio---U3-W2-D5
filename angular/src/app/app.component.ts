import { Component } from '@angular/core';
import { ToDoListService } from './services/to-do-list.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular';

  constructor(
    private todolistService: ToDoListService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchService.getSearchTerm().subscribe((searchTerm) => {
      this.todolistService.searchByUser(searchTerm);
    });
    this.todolistService.getTodosAndUsers().subscribe((data) => {
      this.todolistService.getTodosWithUsers();
      this.todolistService.getUsersWithTodos();
      this.todolistService.getTodosWithUsersFilteredByCompleted(true);
      console.log('todos & users', data);
    });
  }
}
