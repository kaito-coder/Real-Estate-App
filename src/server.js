import * as dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDataBase from './database/connectDB.js';

const PORT = process.env.PORT || 3000;

async function run() {
  await connectDataBase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
run();
