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
    return users.map((user) => {
      const userAmount = new User(
        user.name,
        user.lastName,
        user.age,
        user.email,
        null,
        user.id,
      );
      delete userAmount.password;
      return userAmount;
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    return new User(
      user.name,
      user.lastName,
      user.age,
      user.email,
      user.password,
      user.id,
    );
  }

  async update(id: number, data: User): Promise<boolean> {
    const userUpdated = await this.userModel.update(data, {
      where: { id: id },
    });

    return userUpdated?.length > 0;
  }

  async delete(id: number): Promise<boolean> {
    const userDeleted = await this.userModel.destroy({ where: { id: id } });

    if (userDeleted) {
      return true;
    }

    return false;
  }
}
