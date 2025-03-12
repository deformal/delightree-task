import { MONGO_URI } from '@delightree-task/constants';
import { connect } from 'mongoose';

export async function DBConnect(): Promise<void> {
  try {
    const mongoURI: string = String(MONGO_URI);
    console.log('Trying to connect to the mongodb');
    console.log('Mongo Uri', mongoURI);
    await connect(mongoURI, {
      autoCreate: true,
      sanitizeFilter: true,
    });
  } catch (err) {
    const error = err as Error;
    console.error(error);
    throw new Error(error.message);
  }
}
