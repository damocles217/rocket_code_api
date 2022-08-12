import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserDto, UserResponseDto } from './dto/user';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';
import { User } from './models/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<Array<UserDto>> {
    return await this.userService.getUsers();
  }

  @Post()
  async createUser(
    @Body() input: UserDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<UserResponseDto> {
    const user: User = await this.userService.createUser(input);

    res.setCookie('user', JSON.stringify(user), {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    });

    return {
      ...user,
      success: true,
    };
  }
}
