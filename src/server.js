import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDataBase from './database/connectDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

async function run() {
  await connectDataBase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
run();
