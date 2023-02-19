import { User } from 'src/users/entities/user.entity';
import { getKeysInFilter } from './filter';

describe('Filter', () => {
  it('should be return a filter in string', () => {
    const expected = `name=teste&lastName=teste&age=1`;
    const filter = getKeysInFilter<User>({
      name: 'teste',
      lastName: 'teste',
      age: 1,
    });
    expect(filter).toBe(expected);
  });

  it('should be return empty string', () => {
    const filter = getKeysInFilter<User>({});
    expect(filter).toBe('');
  });
});
