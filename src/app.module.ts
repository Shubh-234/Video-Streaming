import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path/posix';
import { secret } from './utils/constants';

@Module({
  imports: [
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://shubhankarbhanot:aqBdf3maBgr0CeYr@videos.magm5tj.mongodb.net/?retryWrites=true&w=majority&appName=videos',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
