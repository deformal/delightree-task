import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express, { Express } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { config } from 'dotenv';
import { ServerContext } from 'src/types/types';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { CustomerResolver } from '../application/resolvers/customers.resolver';
import { AnalyticsResolver } from '../application/resolvers/analytic.resolvers';
import { ProductResolver } from '../application/resolvers/product.resolvers';
import { OrdersResolver } from '../application/resolvers/orders.resolver';
config();

export async function ApolloServerConfig(
  http_server: http.Server,
): Promise<ApolloServer<ServerContext>> {
  morgan.token('graphql-query', (req) => {
    if (req['body']) {
      const { variables, operationName } = req['body'];
      return `Operation: ${operationName || 'Anonymous'} | Variables: ${JSON.stringify(variables)}`;
    }
    return 'No GraphQL Query';
  });

  const apollo_schema = await buildSchema({
    resolvers: [
      CustomerResolver,
      ProductResolver,
      OrdersResolver,
      AnalyticsResolver,
    ],
    validate: true,
  });

  const server = new ApolloServer<ServerContext>({
    schema: apollo_schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http_server })],
    logger: {
      debug: (msg: string) => msg,
      info: (msg: string) => msg,
      warn: (msg: string) => msg,
      error: (msg: string) => msg,
    },
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
  server: ApolloServer<ServerContext>,
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

  app.use((req, res, next) => {
    const oldSend = res.send;
    res.send = function (body) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (res as any)['body'] = body;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, prefer-rest-params
      return oldSend.apply(res, arguments);
    };
    next();
  });

  morgan.token(
    'graphql-response',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    (req, res) => (res as any).body || 'No Response',
  );

  app.use(
    morgan(':method :url - :graphql-query - Response: :graphql-response', {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      skip: (req) => req.body?.operationName === 'IntrospectionQuery',
    }),
  );
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
