import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { secret } from 'src/utils/constants';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const reqBody = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
    };
    const newUser = new this.userModel(reqBody);
    return newUser.save();
  }

  async signIn(user: User): Promise<any> {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();

    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    const isPasswordMatching = await bcrypt.compare(
      user.password,
      foundUser.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.FORBIDDEN,
      );
    }

    // return user;

    const payload = { email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });
    console.log(token);
    return { token };
  }
  async getOne(email): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }
}
