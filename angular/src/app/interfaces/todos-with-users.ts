import { iUsers } from './users';

export interface iTodosWithUsers {
  id: number;
  todo: string;
  completed: boolean;
  userId: iUsers | undefined;
}
