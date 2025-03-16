import 'dotenv/config';

export const PORT: number = Number(process.env.PORT);
export const MONGO_URI: string = String(process.env.MONGO_URI);
export const NODE_ENV: string = String(process.env.NODE_ENV);
export const REDIS_HOST: string = String(process.env.REDIS_HOST);
export const REDIS_PORT: number = Number(process.env.REDIS_PORT);
export const REDIS_PASSWORD: string = String(process.env.REDIS_PASSWORD);
export const MONGO_DB_NAME: string = String(process.env.MONGO_DB_NAME);
export const CUSTOMER_PASSWORD: string = String(process.env.CUSTOMER_PASSWORD);
export const MONGO_INITDB_ROOT_USERNAME: string = String(
  process.env.MONGO_INITDB_ROOT_USERNAME,
);
export const MONGO_INITDB_ROOT_PASSWORD: string = String(
  process.env.MONGO_INITDB_ROOT_PASSWORD,
);
export const REPLICA_SET_URI: string = String(process.env.REPLICA_SET_URI);
export const JWT_KEY: string = String(process.env.JWT_KEY);
