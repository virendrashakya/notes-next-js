import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to keep the MongoClient instance
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoClient instance
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
