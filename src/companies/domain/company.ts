import { ApiProperty } from '@nestjs/swagger';
import { Address } from './address';

export class Company {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  legalForm: string;

  @ApiProperty({ example: '123456789' })
  siren: string;

  @ApiProperty({ example: '12345678901234' })
  siret: string;

  @ApiProperty({ example: 'FRXX999999999' })
  tvaNumber: string;

  @ApiProperty()
  creationDate: Date;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ required: false })
  website?: string | null;

  @ApiProperty({ type: () => [Address], required: false })
  addresses?: Address[] | null;
}
