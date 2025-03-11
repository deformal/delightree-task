import { BaseContext } from '@apollo/server';

export interface MyContext extends BaseContext {
  token?: string;
}
