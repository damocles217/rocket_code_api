import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { user, inputUser } from './__mocks__/user.create';
import { User } from '../models/user.entity';
import application from '../../main';
import supertest from 'supertest';

const api = supertest(application.app);

afterAll(async () => {
  await application.server.close();
});

describe('User Controller', () => {
  let controller: UserController;

  const mockedRepo = {
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
