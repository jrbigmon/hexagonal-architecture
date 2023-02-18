import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/user.entity';

const models = [User];

@Module({
  imports: [
    SequelizeModule.forRoot({
      host: ':memory:',
      autoLoadModels: true,
      dialect: 'sqlite',
      database: 'hexagonal-architecture',
      logging: true,
      models,
    }),
    UsersModule,
  ],
})
export class AppModule {}
