import { UserGatewayHttp } from './gateways/users-gateways-http';
import { UserGatewaySequelize } from './gateways/users-gateways-sequelize';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserGatewayInterface')
    private userGatewayInternal: UserGatewaySequelize,
    @Inject('UserGatewayHttp')
    private userGatewayIntegration: UserGatewayHttp,
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

    await this.userGatewayIntegration.create(user);

    return userCreatedInternal;
  }

  async findAll() {
    return await this.userGatewayInternal.findAll();
  }

  async findOne(id: number) {
    return await this.userGatewayInternal.findById(id);
  }

  async update(id: number, updateUserDto: User) {
    await this.userGatewayIntegration.update(id, updateUserDto);
    return await this.userGatewayInternal.update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.userGatewayIntegration.delete(id);
    return await this.userGatewayInternal.delete(id);
  }
}
