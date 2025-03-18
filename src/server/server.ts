import express, { Express } from 'express';
import http from 'http';
import { config } from 'dotenv';
import { ApolloServerConfig, ServerConfig } from './server-config';
import { DBConnect } from '../infra/mongo/mongo-connect';
import { redisClient } from '../infra/redis/redis.entity';
import { PORT } from '../constants';
config();

export async function startServer() {
  try {
    const app: Express = express();
    await DBConnect();
    await redisClient.connect();
    const httpServer = http.createServer(app);
    const server = await ApolloServerConfig(httpServer);
    await server.start();
    ServerConfig(app, server);
    httpServer.listen({ port: PORT }, () => {
      console.log(`Server started on http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    throw new Error(error.message);
  }
}
