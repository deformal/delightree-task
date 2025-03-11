import { startServer } from './server/server';
startServer().catch((error) => {
  console.error('Server failed to start:', error);
});
