import { ApiProperty } from '@nestjs/swagger';
import { Company } from '@companies/domain/company';

export class Contact {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty({ required: false })
  birthdate?: Date;

  @ApiProperty()
  job: string;

  @ApiProperty({ type: () => [Company], required: false })
  companies?: Company[] | null;
}
