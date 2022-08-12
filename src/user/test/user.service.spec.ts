import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { UserService } from '../user.service';
import { inputUser, user } from './__mocks__/user.create';

const mockedRepo = {
  find: jest.fn().mockResolvedValue([user, user]),
  save: jest.fn().mockResolvedValue(user),
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Should return an user', async () => {
    const user = await service.createUser(inputUser);
    expect(user.id).toBe(1);
    expect(user.name).toBe('hi');
  });

  it('Should return array of users', async () => {
    const users = await service.getUsers();
    expect(users).toHaveLength(2);
    expect(users[1].lastname).toBe('main');
  });
});
