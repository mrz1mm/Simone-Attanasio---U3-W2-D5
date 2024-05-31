import { iTodos } from './todos';

export interface iUsersWithTodos {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  title: string;
  todos?: iTodos[] | undefined;
}
