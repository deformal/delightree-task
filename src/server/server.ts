import express, { Express } from 'express';
import http from 'http';
import { config } from 'dotenv';
import { ApolloServerConfig, ServerConfig } from './server-config';
import { DBConnect } from '@delightree-task-mongo/connect';
config();

export async function startServer() {
  try {
    const app: Express = express();
    await DBConnect();
    const httpServer = http.createServer(app);
    const server = ApolloServerConfig(httpServer);
    await server.start();
    ServerConfig(app, server);
    httpServer.listen({ port: 4000 }, () => {
      console.log('Server started on port 4000');
    });
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    throw new Error(error.message);
  }
}
