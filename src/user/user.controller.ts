import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFiles,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Res() response, @Body() user: User) {
    const newUser = await this.userService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Post('signin')
  async signIn(@Res() response, @Body() user: User) {
    try {
      const token = await this.userService.signIn(user);
      return response.status(HttpStatus.OK).json({
        message: 'User successfully signed in',
        token,
      });
    } catch (error) {
      return response.status(error.status || HttpStatus.FORBIDDEN).json({
        message: error.message || 'Error: Unable to sign in',
      });
    }
  }
}
