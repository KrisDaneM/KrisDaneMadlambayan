import { MongoClient } from 'mongodb';

const DATABASE_NAME = 'kdm_portfolio';
const connectionCache = globalThis;

export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MongoDB is not configured.');

  if (!connectionCache.__kdmMongoClientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 10 });
    connectionCache.__kdmMongoClientPromise = client.connect().catch((error) => {
      connectionCache.__kdmMongoClientPromise = undefined;
      throw error;
    });
  }

  const client = await connectionCache.__kdmMongoClientPromise;
  return client.db(DATABASE_NAME);
}
