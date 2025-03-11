import express, { Express } from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { config } from 'dotenv';
import { ServerConfig } from './server-config';
import { MyContext } from 'src/types/types';
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

export async function startServer() {
  const app: Express = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  ServerConfig(app, server);
  await new Promise<void>((resolve) => {
    console.log(`Server started @ http://localhost:4000/`);
    httpServer.listen({ port: 4000 }, resolve);
  });
}
