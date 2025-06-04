import { ApiProperty } from '@nestjs/swagger';

export interface OpLine {
  id: string;
  opportunityId: string;
  _type: 'ReverseFactoringLine' | 'FactoringLine' | 'CreditInsuranceLine';
}

export class ReverseFactoringLine implements OpLine {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  opportunityId: string;

  @ApiProperty({ enum: ['ReverseFactoringLine'] })
  _type: 'ReverseFactoringLine' = 'ReverseFactoringLine';

  @ApiProperty()
  buyerId: string;

  @ApiProperty()
  supplierId: string;
}

export class FactoringLine implements OpLine {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  opportunityId: string;

  @ApiProperty({ enum: ['FactoringLine'] })
  _type: 'FactoringLine' = 'FactoringLine';

  @ApiProperty()
  factorId: string;
}

export class CreditInsuranceLine implements OpLine {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  opportunityId: string;

  @ApiProperty({ enum: ['CreditInsuranceLine'] })
  _type: 'CreditInsuranceLine' = 'CreditInsuranceLine';

  @ApiProperty()
  insurerId: string;
}
