import { Injectable } from '@nestjs/common';
import { UserGatewayInterface } from './users-gatways-interface';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { UserModel } from '../entities/user.model';

@Injectable()
export class UserGatewaySequelize implements UserGatewayInterface {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async create(user: User): Promise<User> {
    const userCreated = await this.userModel.create(user);
    user.id = userCreated.id;
    return userCreated;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.findAll();
    return users.map(
      (user) =>
        new User(user.name, user.lastName, user.age, user.email, user.password),
    );
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    return new User(
      user.name,
      user.lastName,
      user.age,
      user.email,
      user.password,
    );
  }
}
