// const { describe, it } = require('node:test');
const { MongoDBContainer } = require('@testcontainers/mongodb');
const { MongoClient } = require('mongodb');

describe('Mongod test', () => {
  it('should connect to mongo', async () => {
    const container = await new MongoDBContainer('mongo:6.0.1').start();

    const mongoClient = await MongoClient.connect(container.getConnectionString() + '?directConnection=true');

    const collection = mongoClient.db('test').collection('records');
    await collection.insertOne({ name: 'Ashish', age: 27 });
    const record = await collection.findOne({ name: 'Ashish' });
    console.log(record);

    await mongoClient.close();
    await container.stop();
  }, 20000);
});
