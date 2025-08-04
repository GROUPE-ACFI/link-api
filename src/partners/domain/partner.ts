import { ApiProperty } from '@nestjs/swagger';

export enum PartnerType {
  BANK = 'BANK',
  INSURER = 'INSURER',
  FINTECH = 'FINTECH',
}

export class Partner {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: PartnerType, enumName: 'PartnerType' })
  type: PartnerType;

  @ApiProperty({ required: false, type: Object })
  settings?: Record<string, any>;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
