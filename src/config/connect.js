import connectDatabase from './database.js';

export default async function connectToDatabase() {
  console.log(await connectDatabase());
  console.log('Database connected:');
}
  
