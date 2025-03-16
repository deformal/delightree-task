import { BaseContext } from '@apollo/server';
import { Request } from 'express';

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

export type GetCustomerOptionsTypes = { id?: string; email?: string };
export type GetProductOptionsTypes = { id?: string; name?: string };
export type CustomerTokensData = {
  customer_id: string;
  exp: string;
  created_at: string;
};
export interface AuthMiddlewareRequest extends Request {
  customer?: CustomerTokensData;
}
