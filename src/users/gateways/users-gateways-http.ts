import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { UserGatewayInterface } from './users-gatways-interface';
import { User } from '../entities/user.entity';
import { Inject } from '@nestjs/common';

export class UserGatewayHttp implements UserGatewayInterface {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async create(user: User): Promise<User> {
    const response = await lastValueFrom(
      this.httpService.post('users', {
        name: user.name,
        lastName: user.lastName,
        fullName: user.fullName,
        age: user.age,
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
}
