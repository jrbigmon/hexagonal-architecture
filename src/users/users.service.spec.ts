import { User } from './entities/user.entity';
import { UserGatewayInMemory } from './gateways/users.gateways-in-memory';
import { UsersService } from './users.service';
import { of } from 'rxjs';

const mockHttpService = {
  emit: jest.fn().mockReturnValue(of(null)),
};

const userMocked: User = {
  id: 1,
  name: 'user',
  lastName: 'user teste',
  age: 123,
  email: 'teste',
  password: 'teste',
};

describe('UsersService', () => {
  let service: UsersService;
  let userGatewayInternal: UserGatewayInMemory;

  beforeAll(() => {
    userGatewayInternal = new UserGatewayInMemory();
    service = new UsersService(userGatewayInternal, mockHttpService as any);
  });

  describe('Create', () => {
    it('should be return create user', async () => {
      const user = await service.create(userMocked);

      expect(user).toMatchObject(userMocked);
    });
  });

  describe('Update', () => {
    it('should be return update user', async () => {
      const userUpdated = await service.update(userMocked.id, {
        ...userMocked,
        name: 'user 2',
      });

      expect(userUpdated).toBe(true);
    });
  });
});
