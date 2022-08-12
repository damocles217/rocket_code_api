import { UserDto } from '../../src/user/dto/user';
import { User } from '../../src/user/models/user.entity';

export const user: User = {
  id: 1,
  name: 'hi',
  lastname: 'main',
  email: 'example@gmail.com',
  bornDate: '2001-11-11',
  phone: '2200220022',
};

export const inputUser: UserDto = {
  name: 'hi',
  lastname: 'main',
  email: 'example@gmail.com',
  bornDate: '2001-11-11',
  phone: '2200220022',
};
