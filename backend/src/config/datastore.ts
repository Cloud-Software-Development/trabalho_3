import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore({
  keyFilename: './src/config/My_Project-cf33d106b3e0.json',
});

export default datastore;
