import { ApiProperty } from '@nestjs/swagger';

export enum ContractStatus {
  ACTIVE = 'ACTIVE',
  TERMINATED = 'TERMINATED',
  EXPIRED = 'EXPIRED',
}

export class Contract {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty({ type: String })
  companyId: string;

  @ApiProperty({ type: String })
  partnerId: string;

  @ApiProperty({ enum: ContractStatus, enumName: 'ContractStatus' })
  status: ContractStatus;

  @ApiProperty({ type: String, format: 'date-time' })
  startDate: Date;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  endDate?: Date;

  @ApiProperty({ type: String, required: false })
  originalOpportunityId?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
