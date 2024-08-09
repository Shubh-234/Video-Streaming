import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../model/user.schema';
import { JwtService } from '@nestjs/jwt';

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
    const token = await this.userService.signIin(user, this.jwtService);
    return response.status(HttpStatus.OK).json({
      token,
    });
  }
}
