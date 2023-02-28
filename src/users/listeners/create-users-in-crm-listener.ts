import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../events/users-created-event';
import { OnEvent } from '@nestjs/event-emitter';
import { UserGatewayHttp } from '../gateways/users-gateways-http';

@Injectable()
export class CreateUserInCrmListener {
  constructor(private userIntegrationGateway: UserGatewayHttp) {}

  @OnEvent('user.created')
  async handle(event: UserCreatedEvent) {
    this.userIntegrationGateway.create(event.user);
  }
}
