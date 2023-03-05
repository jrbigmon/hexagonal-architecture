import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { LocationCreateDto } from '../../locations/dto/location-create.dto';
import { ValidateNestedCustom } from '../../utils/validate-nested-custom';
import { User } from '../entities/user.entity';

export class UserCreateDto extends PartialType(User) {
  @IsString({ message: 'Name is string' })
  name: string;
  @IsString({ message: 'Last name is string' })
  lastName: string;
  @IsString({ message: 'E-mail is string' })
  email: string;
  @IsString({ message: 'Password is string' })
  password: string;
  @IsNumber({ allowNaN: false }, { message: 'Age is number' })
  age: number;
  @ValidateNestedCustom(LocationCreateDto)
  location: LocationCreateDto;
}
