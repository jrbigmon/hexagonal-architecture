import { UserGatewayHttp } from './gateways/users-gateways-http';
import { UserGatewaySequelize } from './gateways/users-gateways-sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';
import { UserModel } from './entities/user.model';
import { UserInCrmListener } from './listeners/users-in-crm.listener';
import { EventEmitter2 } from '@nestjs/event-emitter';

const models = [UserModel];
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UserGatewaySequelize,
    UserGatewayHttp,
    UserInCrmListener,
    {
      provide: 'UserGatewayInterface',
      useExisting: UserGatewaySequelize,
    },
    {
      provide: 'UserGatewayHttp',
      useExisting: UserGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
  imports: [
    SequelizeModule.forFeature(models),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],
})
export class UsersModule {}
