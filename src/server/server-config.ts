import { ApolloServer } from '@apollo/server';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express, { Express } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { config } from 'dotenv';
import { MyContext } from 'src/types/types';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
config();

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!',
  },
};

export function ApolloServerConfig(
  http_server: http.Server,
): ApolloServer<MyContext> {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http_server })],
    formatError: (err) => {
      console.error('GraphQL Error:', err);
      return {
        message: err.message || 'Internal Server Error',
        code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
      };
    },
  });
  return server;
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
  app.use('/graphql', expressMiddleware(server) as any);
}

const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['*'],
  credentials: false,
};
