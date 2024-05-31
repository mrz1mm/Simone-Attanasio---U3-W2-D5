import { iTodosWithUsers } from './../interfaces/todos-with-users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  Subject,
  throwError,
  catchError,
  map,
} from 'rxjs';
import { iTodos } from '../interfaces/todos';
import { iUsers } from '../interfaces/users';
import { iAllGet } from '../interfaces/allGet';
import { iUsersWithTodos } from '../interfaces/users-with-todos';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  todosUrl: string = 'http://localhost:3000/toDoList'; // Server 1
  usersUrl: string = 'http://localhost:3001/users'; // Server 2

  allGetSubject$ = new Subject<iAllGet>();
  allGetObject: iAllGet | null = null;

  todoWithUsers$ = new BehaviorSubject<iTodosWithUsers[]>([]);
  todoWithUsersArray: iTodosWithUsers[] = [];

  todosCompletedTrue$ = new BehaviorSubject<iTodosWithUsers[]>([]);
  todosCompletedTrueArray: iTodosWithUsers[] = [];
  todosCompletedTrueObservable = this.todosCompletedTrue$.asObservable();
  todosCompletedFalse$ = new BehaviorSubject<iTodosWithUsers[]>([]);

  usersWithTodos$ = new BehaviorSubject<iUsersWithTodos[]>([]);
  usersWithTodosArray: iUsersWithTodos[] = [];

  userSearched$ = new BehaviorSubject<iUsersWithTodos[]>([]);
  userSearchedArray: iUsersWithTodos[] = [];

  todosSearched$ = new BehaviorSubject<iTodosWithUsers[]>([]);
  todosSearchedArray: iTodosWithUsers[] = [];

  searchTerm$ = new BehaviorSubject<string>('');
  searchTermObservable = this.searchTerm$.asObservable();

  constructor(private http: HttpClient) {}

  getTodos(): Observable<iTodos[]> {
    return this.http.get<iTodos[]>(this.todosUrl).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Error fetching todos:', error.message)
        );
      })
    );
  }

  getUsers(): Observable<iUsers[]> {
    return this.http.get<iUsers[]>(this.usersUrl).pipe(
      catchError((error) => {
        return throwError(
          () => new Error('Error fetching users:', error.message)
        );
      })
    );
  }

  getTodosAndUsers(): Observable<iAllGet> {
    return forkJoin({
      todos: this.getTodos(),
      users: this.getUsers(),
    }).pipe(
      map(({ todos, users }) => {
        let allGetObject: iAllGet = {
          todos: todos,
          users: users,
        };

        // Memorizza i dati nel servizio
        this.allGetObject = allGetObject;
        this.allGetSubject$.next(this.allGetObject);
        return allGetObject;
      })
    );
  }

  getTodosWithUsers(): void {
    const todos = this.allGetObject?.todos;
    const users = this.allGetObject?.users;
    const todosWithUsers: iTodosWithUsers[] =
      todos?.map((todo) => {
        let newTodo: iTodosWithUsers = {
          ...todo,
          userId: users?.find((user) => user.id == todo.userId),
        };
        return newTodo;
      }) || [];
    this.todoWithUsers$.next(todosWithUsers);
    this.todoWithUsersArray = todosWithUsers;
    console.log('todosWithUsers', todosWithUsers);
  }

  getTodosWithUsersFilteredByCompleted(completed: boolean): void {
    const todosWithUsersFilteredByCompleted: iTodosWithUsers[] =
      this.todoWithUsersArray.filter((todo) => todo.completed === completed);

    this.todosCompletedTrueArray = todosWithUsersFilteredByCompleted;
    this.todosCompletedTrue$.next(todosWithUsersFilteredByCompleted);
    console.log(`completed ${completed}`, todosWithUsersFilteredByCompleted);
  }

  getUsersWithTodos(): void {
    const todos = this.allGetObject?.todos;
    const users = this.allGetObject?.users;

    console.log('todos', todos);
    console.log('users', users);

    const usersWithTodos: iUsersWithTodos[] =
      users?.map((user) => {
        const userTodos = todos?.filter((todo) => todo.userId == user.id);

        let newUser: iUsersWithTodos = {
          ...user,
          todos: userTodos,
        };
        return newUser;
      }) || [];

    this.usersWithTodos$.next(usersWithTodos);
    this.usersWithTodosArray = usersWithTodos;
    console.log('usersWithTodos', usersWithTodos);
    console.log(
      'Prova',
      usersWithTodos?.[0]?.todos?.[0].todo ?? 'No todos found'
    );
  }

  searchByUser(searchTerm: string): void {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const userSearched = this.usersWithTodosArray.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(lowerCaseSearchTerm) ||
        user.lastName?.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.userSearched$.next(userSearched);
    this.userSearchedArray = userSearched;
    console.log('userSearched', userSearched);
  }

  searchByTodo(searchTerm: string): void {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const todosSearched = this.todoWithUsersArray.filter(
      (todo) =>
        todo.userId?.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
        todo.userId?.lastName.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.todosSearched$.next(todosSearched);
    this.todosSearchedArray = todosSearched;
    console.log('todosSearched', todosSearched);
  }

  setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
    this.searchByUser(term);
    this.searchByTodo(term);
  }

  updateTodo(todo: iTodosWithUsers): void {
    let newTodo: iTodos = {
      completed: todo.completed,
      id: todo.id,
      todo: todo.todo,
      userId: todo.userId?.id ?? 0,
    };
    console.log('newTodo', newTodo);
    console.log(`Updating todo:`, todo);
    this.http
      .put<iTodos>(`${this.todosUrl}/${todo.id}`, newTodo)
      .subscribe(() => {
        this.getTodosAndUsers().subscribe(() => {
          this.getTodosWithUsers();
          this.getTodosWithUsersFilteredByCompleted(true);
        });
      });
  }
}
