import { UserModel } from './users/entities/user.model';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LogsModule } from './logs/logs.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
const models = [UserModel];
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot({
      host: ':memory:',
      autoLoadModels: true,
      dialect: 'sqlite',
      database: 'hexagonal-architecture',
      logging: false,
      models,
    }),
    UsersModule,
    LogsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
