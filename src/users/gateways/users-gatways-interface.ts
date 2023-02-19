import { User } from '../entities/user.entity';

export interface UserGatewayInterface {
  create(User: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
}
