import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Commission {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  opportunityId: string;

  @ApiProperty()
  introducerCompanyId: string;

  @ApiProperty()
  payerCompanyId: string;

  @ApiPropertyOptional()
  amountFixed?: number;

  @ApiPropertyOptional()
  percentage?: number;

  @ApiPropertyOptional()
  conditions?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  paidAt?: Date;

  @ApiProperty({ enum: ['pending', 'paid', 'cancelled'] })
  status: 'pending' | 'paid' | 'cancelled';
}
