import { UserModel } from './users/entities/user.model';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerMiddleware } from './logger/logger.middleware';

const models = [UserModel];

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
