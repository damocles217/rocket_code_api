import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from '../src/user/user.service';
import { inputUser, user } from './__mocks__/user.create';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { UserResponseDto } from 'src/user/dto/user';

jest.setTimeout(10000);

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;
  const secret = 'fd2@dalfG42[dfav%%af';
  const service = {
    getUsers: () => [user, user],
    createUser: () => user,
  };

  afterEach(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(service)
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.register(fastifyCookie, {
      secret: process.env.COOKIE_SECRET || secret,
    });
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/user (GET)', async () => {
    await request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect([user, user]);
  });

  it('/user (POST)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/user',
      payload: inputUser,
    });
    const body: UserResponseDto = await JSON.parse(response.body);

    expect(body.id).toBe(1);
    expect(body.name).toBe('hi');
  });
});
