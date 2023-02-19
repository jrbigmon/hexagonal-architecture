import { UserGatewayHttp } from './gateways/users-gateways-http';
import { UserGatewaySequelize } from './gateways/users-gateways-sequelize';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserGatewayInterface')
    private userGatewayInternal: UserGatewaySequelize,
    @Inject('UserGatewayHttp')
    private userGatewayIntegration: UserGatewayHttp,
  ) {}

  async create(createUserDto: CreateUserDto) {
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return 'teste';
    // return await this.repository.update(updateUserDto, { where: { id: id } });
  }

  async remove(id: number) {
    return 'teste';
    // return await this.repository.destroy({ where: { id: id } });
  }
}
