import { User } from '../entities/user.entity';

export interface UserGatewayInterface {
  create(User: User): Promise<User>;
  update?(id: number, user: User): Promise<boolean>;
  delete?(id: number): Promise<void | boolean>;
  findAll?(): Promise<User[]>;
  findById?(id: number): Promise<User>;
  findByFilter?(filter: Partial<User>): Promise<Partial<User>>;
}
