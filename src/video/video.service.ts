import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from '../model/video.schema';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Request, Response } from 'express';

//createReadStream to read files
//statSync to get the file details

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async createVideo(video: Object): Promise<Video> {
    const newVideo = this.videoModel.create(video);
    return (await newVideo).save();
  }

  async readVideo(id): Promise<any> {
    if (id.id) {
      return await this.videoModel
        .findOne({ _id: id.id })
        .populate('createdBy')
        .exec();
    }
    return this.videoModel.find().populate('createdBy').exec();
  }

  async streamVideo(id: string, response: Response, request: Request) {
    try {
      const data = await this.videoModel.findOne({ _id: id });
      if (!data) {
        throw new NotFoundException(null, 'Video not found');
      }
      const { range } = request.headers;
      if (range) {
        const { video } = data;
        //from VideoDocument
        const videoPath = statSync(join(process.cwd(), `./public/${video}`));
        //statsync gives us the properties of the path like it's size
        const CHUNK_SIZE = 1 * 1e6;
        //1 mb
        const start = Number(range.replace(/\D/g, ''));
        //converts all digits character to alphabetcial
        const end = Math.min(start + CHUNK_SIZE, videoPath.size - 1);
        const videoLength = end - start + 1;
        response.status(206);
        response.header({
          'Content-Range': `bytes ${start}-${end}/${videoPath.size}`,
          //bytes ${start}-${end}/${videoPath.size}`: Indicates the range of bytes being sent and the total size of the file.
          'Accept-Ranges': 'bytes',
          //bytes': Tells the client that the server supports partial requests.
          'Content-length': videoLength,
          //Specifies the length of the content being sent.
          'Content-Type': 'video/mp4',
        });
        const vidoeStream = createReadStream(
          join(process.cwd(), `./public/${video}`),
          { start, end },
        );
        //Creates a readable stream for the video file, starting at the start byte and ending at the end byte.
        vidoeStream.pipe(response);
        //puts the video stream in the response object,sending video data to client
      } else {
        throw new ServiceUnavailableException(null, 'range not found');
      }
    } catch (error) {}
  }

  async update(id: string, video: Video) {
    return await this.videoModel.findByIdAndUpdate(id, video, { new: true });
  }

  async delelteVideo(id: string) {
    return await this.videoModel.findByIdAndDelete(id);
  }
}
