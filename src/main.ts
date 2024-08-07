import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  const url =
    'mongodb+srv://shubhankarbhanot:aqBdf3maBgr0CeYr@videos.magm5tj.mongodb.net/?retryWrites=true&w=majority&appName=videos';

  const app = await NestFactory.create(AppModule);
  console.log('hello');
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Connection to MongoDB failed', err);
  }
  await app.listen(3005);
}
bootstrap();
