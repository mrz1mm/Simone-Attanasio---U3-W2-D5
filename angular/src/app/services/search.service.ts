import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoListService } from './to-do-list.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTerm$ = new BehaviorSubject<string>('');

  constructor(private todolistService: ToDoListService) {}

  getSearchTerm() {
    return this.searchTerm$.asObservable();
  }

  setSearchTerm(term: string) {
    this.searchTerm$.next(term);
    this.todolistService.setSearchTerm(term);
  }
}
