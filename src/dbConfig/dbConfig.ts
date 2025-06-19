
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('✅ Connected to MongoDB successfully');
    });

    connection.on('error', (error) => {
      console.error('Error connecting to MongoDB:', error);
    });
  } catch (error) {
    console.error('Something went wrong while connecting to the database:', error);
  }
};
