import { ApiProperty } from '@nestjs/swagger';

export enum ContractProductType {
  FACTOR = 'FACTOR',
  CREDIT_INSURANCE = 'CREDIT_INSURANCE',
  REVERSE_FACTORING = 'REVERSE_FACTORING',
  CUSTOM = 'CUSTOM',
}

export class ContractProduct {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty({ type: String })
  contractId: string;

  @ApiProperty({ enum: ContractProductType, enumName: 'ContractProductType' })
  productType: ContractProductType;

  @ApiProperty()
  limitAmount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  feesPercentage: number;

  @ApiProperty({ required: false, type: Object })
  metadata?: Record<string, any>;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
