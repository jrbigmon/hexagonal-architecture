import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from '../events/users-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { UserGatewayHttp } from '../gateways/users-gateways-http';
import { UserUpdatedEvent } from '../events/users-updated.event';

@Injectable()
export class UserInCrmListener {
  constructor(private userIntegrationGateway: UserGatewayHttp) {}

  @OnEvent('user.created')
  async handleCreate(event: UserCreatedEvent) {
    this.userIntegrationGateway.create(event.user);
  }

  @OnEvent('user.updated')
  async handleUpdate(id: number, event: UserUpdatedEvent) {
    this.userIntegrationGateway.update(id, event.user);
  }

  @OnEvent('user.deleted')
  async handleDelete(id: number) {
    this.userIntegrationGateway.delete(id);
  }
}
