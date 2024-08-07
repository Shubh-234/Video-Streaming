import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://shubhankarbhanot:aqBdf3maBgr0CeYr@videos.magm5tj.mongodb.net/?retryWrites=true&w=majority&appName=videos`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
