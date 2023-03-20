import mongoose from 'mongoose';

const connectDataBase = async () => {
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_LOCALHOST_URL, {
      dbName: `${process.env.DB_NAME}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB');
  } catch (err) {
    throw new Error('Failed to connect DB');
  }
};

const disConnectDataBase = async () => {
  try {
    return mongoose.disconnect();
  } catch (error) {
    throw new Error(error);
  }
};

export { connectDataBase, disConnectDataBase };
