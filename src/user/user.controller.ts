import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserDto, UserResponseDto } from './dto/user';
import { UserService } from './user.service';
import { FastifyReply } from 'fastify';

@Controller('contact')
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
    const user: UserDto = await this.userService.createUser(input);

    res.setCookie('user', JSON.stringify(user));

    return {
      ...user,
      success: true,
    };
  }
}
