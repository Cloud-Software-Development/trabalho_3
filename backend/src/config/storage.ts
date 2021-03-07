import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: './src/config/My_Project-cf33d106b3e0.json',
});

export default storage.bucket('validator-file-fb');
