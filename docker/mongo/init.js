rs.initiate({
  _id: 'rs0',
  members: [{ _id: 0, host: '127.0.0.1:27017' }],
});

while (!rs.isMaster().ismaster) {
  sleep(1000);
}

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);
db.createUser(
  {
    user: process.env.MONGO1_USERNAME,
    pwd: process.env.MONGO1_PASSWORD,
    roles: [{ role: 'readWrite', db: process.env.MONGO_INITDB_DATABASE }],
  },
  { w: 'majority', wtimeout: 5000 },
);
db.createCollection('customers');
db.createCollection('products');
db.createCollection('orders');

print('Replica set initialized and collections created.');
