import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
//uuid is a package that generates unique identifiers (UUIDs).
//A UUID is a string that is globally unique, which means that no two UUIDs will ever be the same.
//uuid just to create unique file name

@Module({
  imports: [
    // Core Modules
    MongooseModule.forRoot(
      'mongodb+srv://shubhankarbhanot:aqBdf3maBgr0CeYr@videos.magm5tj.mongodb.net/?retryWrites=true&w=majority&appName=videos',
    ),
    MulterModule.register({
      storage: diskStorage({
        //multer module is used for handling file uploads in node js
        //it takes care in handling multipart/form-data
        destination: './public',
        //filename determines how a file should be named
        //req = request,file is an object, cb is a callback
        filename: (req, file, cb) => {
          const ext = file.mimetype.split('/')[1]; // Extracts the file extension from the mimetype (e.g., 'image/jpeg' -> 'jpeg')
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`); // Generates a unique filename using UUID, the current timestamp, and the file extension
        },
      }),
    }),

    // Feature Modules
    UserModule,
    VideoModule,

    // Catch-All or Static File Serving Modules
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
