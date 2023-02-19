import { User } from './../entities/user.entity';
import { UserGatewayInterface } from './users-gatways-interface';
export class UserGatewayInMemory implements UserGatewayInterface {
  users: User[] = [];

  async create(user: User): Promise<User> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
