import fastifyCookie from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const secret = 'fd2@dalfG42[dfav%%af';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || secret,
  });

  app.enableCors({
    preflightContinue: true,
    credentials: true,
    origin: '*',
  });

  await app.listen(3000, '0.0.0.0');
  console.log('Running on port 3000');
}

bootstrap();
