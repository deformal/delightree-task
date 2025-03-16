import { JWT_KEY } from '../../constants';
import { AuthMiddlewareRequest, CustomerTokensData } from '../../types/types';
import { NextFunction, Response } from 'express';
import { GraphQLError } from 'graphql';
import { verify } from 'jsonwebtoken';

export function AuthMiddleware(
  req: AuthMiddlewareRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const auth_header = req.header('Authorization');
    if (!auth_header) throw new Error('Unauthorized');
    const auth_token = auth_header.split(' ')[1];
    const decoded_token_data = VerifyAuthToken<CustomerTokensData>(auth_token);
    req.customer = decoded_token_data;
    next();
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    throw new GraphQLError('Unauthorized');
  }
}

function VerifyAuthToken<T>(auth_token: string): T {
  const decoded_token_data = verify(auth_token, JWT_KEY);
  return decoded_token_data as T;
}
