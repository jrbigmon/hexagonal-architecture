import { IsString } from 'class-validator';

export class LocationCreateDto {
  @IsString({ message: 'Adress Line is string' })
  addressLine1: string;
  @IsString({ message: 'Code is string' })
  code: string;
  @IsString({ message: 'address number is string' })
  adressNumber: string;
}
