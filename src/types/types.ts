import { BaseContext } from '@apollo/server';

export interface MyContext extends BaseContext {
  token?: string;
}

export enum ResponseMessages {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export type GeneralResponse = {
  message: ResponseMessages;
  ok: boolean;
};
