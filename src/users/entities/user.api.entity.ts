import { PartialType } from '@nestjs/mapped-types';
import { User } from './user.entity';
export class UserInApi extends PartialType(User) {
  public internalId?: number;
}
