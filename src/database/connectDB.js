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
    console.log('Failed to connect DB');
    console.log(err);
  }
};
export default connectDataBase;
