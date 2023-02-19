import { UserModel } from './entities/user.model';
import { User } from './entities/user.entity';
import { UserGatewayInMemory } from './gateways/users.gateways-in-memory';
import { UsersService } from './users.service';
import { of } from 'rxjs';

const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null)),
};

describe('UsersService', () => {
  let service: UsersService;
  let userGateway: UserGatewayInMemory;

  beforeEach(() => {
    userGateway = new UserGatewayInMemory();
    service = new UsersService(userGateway, mockHttpService as any);
  });

  describe('Create', () => {
    it('should be return create user', async () => {
      const userMocked = {
        name: 'user',
        lastName: 'user teste',
        age: 123,
        email: 'teste',
        password: 'teste',
      } as User;

      const user = await service.create(userMocked);

      expect(user).toMatchObject(userMocked);
    });
  });
});
