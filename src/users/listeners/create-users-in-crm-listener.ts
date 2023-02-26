import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../events/users-created-event';
import { OnEvent } from '@nestjs/event-emitter';
import { UserGatewayInterface } from '../gateways/users-gatways-interface';

@Injectable()
export class CreateUserInCrmListener {
  constructor(private userIntegrationGateway: UserGatewayInterface) {}

  @OnEvent('user.created')
  async handle(event: UserCreatedEvent) {
    this.userIntegrationGateway.create(event.user);
  }
}
