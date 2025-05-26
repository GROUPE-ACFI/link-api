import { ApiProperty } from '@nestjs/swagger';
import { AddressType } from './address-type.enum';

export class Address {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty({ enum: AddressType })
  type: AddressType;
}
