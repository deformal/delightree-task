import { BaseContext } from '@apollo/server';
import { Request } from 'express';

export interface ServerContext extends BaseContext {
  token?: string;
}

export enum ResponseMessages {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export type GeneralResponse = {
  message: ResponseMessages;
  success: boolean;
};

export type CustomerTokensData = {
  customer_id: string;
  exp: string;
  created_at: string;
};

export interface AuthMiddlewareRequest extends Request {
  customer?: CustomerTokensData;
}
