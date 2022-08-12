import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from '../src/user/user.service';
import { user } from './__mocks__/user.create';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

jest.setTimeout(10000);
describe('AppController (e2e)', () => {
  let app: INestApplication;
  const service = {
    getUsers: () => [user, user],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(service)
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter({}),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect([user, user]);
  });
  afterAll(async () => {
    await app.close();
  });
});
