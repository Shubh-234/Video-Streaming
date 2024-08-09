import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UserModule } from './user/user.module';
import { secret } from 'src/utils/constants';

@Module({
  imports: [
    // Core Modules
    MongooseModule.forRoot(
      'mongodb+srv://shubhankarbhanot:aqBdf3maBgr0CeYr@videos.magm5tj.mongodb.net/?retryWrites=true&w=majority&appName=videos',
    ),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),

    // Feature Modules
    UserModule,

    // Catch-All or Static File Serving Modules
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),
  ],
})
export class AppModule {}
