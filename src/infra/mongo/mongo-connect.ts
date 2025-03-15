import { MONGO_URI } from '../../constants';
import { connect } from 'mongoose';
import { Seed } from './seed/seed';

export async function DBConnect(): Promise<void> {
  try {
    console.log('Trying to connect to the replica set');
    const mongoose = await connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    if (!mongoose.connection.db)
      throw Error('ERROR CONNECTING TO THE ADMIN DB');
    console.log('✅ Connected to MongoDB Replica Set');
    console.log('Seeding');
    await Seed();
  } catch (err) {
    const error = err as Error;
    console.error(error);
    throw new Error(error.message);
  }
}
