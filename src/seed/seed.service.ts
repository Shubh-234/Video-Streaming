// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import { Video, VideoDocument } from 'src/model/video.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async seed() {
    const user = new this.userModel({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    await user.save();

    const video = new this.videoModel({
      title: 'Sample Video',
      video: 'http://example.com/sample.mp4',
      coverImage: 'http://example.com/sample.jpg',
      createdBy: user._id,
    });
    await video.save();

    console.log('Data seeded');
  }
}
