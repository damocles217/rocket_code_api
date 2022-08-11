import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async createUser(input: UserDto): Promise<UserDto> {
    try {
      const data = await this.userRepo.save(input);

      return data;
    } catch (e) {}
  }

  async getUsers(): Promise<Array<UserDto>> {
    const users = await this.userRepo.find();
    return users;
  }
}
