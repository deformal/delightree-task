import { ApolloServer, BaseContext } from '@apollo/server';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express, { Express } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { config } from 'dotenv';
config();

interface MyContext extends BaseContext {
  token?: string;
}

export function ServerConfig(
  app: Express,
  server: ApolloServer<MyContext>,
): void {
  if (process.env.NODE_ENV === 'development') {
    app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      }),
    );
  } else {
    app.use(helmet());
  }
  app.use(morgan('dev'));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(cors<cors.CorsRequest>(corsOptions));
  app.use('/', expressMiddleware(server) as any);
}

const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['*'],
  credentials: false,
};
