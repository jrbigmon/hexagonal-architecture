import { UserCreatedEvent } from './events/users-created.event';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import EventEmitter from 'events';
import { UserUpdatedEvent } from './events/users-updated.event';
import { UserGatewayInterface } from './gateways/users-gatways-interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserGatewayInterface')
    private userGatewayInternal: UserGatewayInterface,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createUserDto: User) {
    const user = new User(
      createUserDto.name,
      createUserDto.lastName,
      createUserDto.age,
      createUserDto.email,
      createUserDto.password,
    );

    const userCreatedInternal = await this.userGatewayInternal.create(user);

    if (userCreatedInternal) {
      this.eventEmitter.emit(
        'user.created',
        new UserCreatedEvent(userCreatedInternal),
      );
    }

    return userCreatedInternal;
  }

  async findAll() {
    return await this.userGatewayInternal.findAll();
  }

  async findOne(id: number) {
    return await this.userGatewayInternal.findById(id);
  }

  async update(id: number, updateUserDto: User) {
    const userUpdated = await this.userGatewayInternal.update(
      id,
      updateUserDto,
    );

    if (userUpdated) {
      this.eventEmitter.emit(
        'user.updated',
        id,
        new UserUpdatedEvent(updateUserDto),
      );
    }

    return userUpdated;
  }

  async remove(id: number) {
    const userDeleted = await this.userGatewayInternal.delete(id);

    if (userDeleted) {
      this.eventEmitter.emit('user.deleted', id);
    }

    return userDeleted;
  }
}
