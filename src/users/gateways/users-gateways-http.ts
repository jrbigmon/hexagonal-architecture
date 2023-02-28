import { UserInApi } from './../entities/user.api.entity';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UserGatewayInterface } from './users-gatways-interface';
import { User } from '../entities/user.entity';
import { Inject } from '@nestjs/common';
import { getKeysInFilter } from 'src/utils/filter';

export class UserGatewayHttp implements UserGatewayInterface {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async create(user: User): Promise<User> {
    const response = await lastValueFrom(
      this.httpService.post('users', {
        internalId: user.id,
        name: user.name,
        lastName: user.lastName,
        age: user.age,
        fullName: `${user.name} ${user.lastName}`,
      }),
    );

    return response?.data;
  }

  async findAll(): Promise<User[]> {
    const response = await lastValueFrom(this.httpService.get('users'));

    return response?.data;
  }

  async findById(id: number): Promise<User> {
    const response = await lastValueFrom(this.httpService.get(`users/${id}`));

    return response?.data;
  }

  async findByFilter(filter: UserInApi): Promise<UserInApi> {
    const query = getKeysInFilter<User>(filter);

    const response = await lastValueFrom(
      this.httpService.get(`users?${query}`),
    );

    return response?.data[0];
  }

  async update(id: number, user: User): Promise<boolean> {
    const userInAPI = await this.findByFilter({ internalId: id });

    const response = await lastValueFrom(
      this.httpService.put(`users/${userInAPI.id}`, {
        name: user.name,
        lastName: user.lastName,
        age: user.age,
        fullName: `${user.name} ${user.lastName}`,
        internalId: id,
      }),
    );

    if (response.data) return true;

    return false;
  }

  async delete(id: number): Promise<boolean> {
    const userInAPI = await this.findByFilter({ internalId: id });
    if (!userInAPI) return false;

    await lastValueFrom(this.httpService.delete(`users/${userInAPI.id}`));

    return true;
  }
}
