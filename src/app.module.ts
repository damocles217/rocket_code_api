import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/models/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com',
      username: 'testing',
      password: 'Pruebas%ALI%2020',
      database: 'testing_ali_fullstack',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
