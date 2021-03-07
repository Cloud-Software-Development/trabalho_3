import express from 'express';
import router from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: __dirname + '/.env' });

const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
