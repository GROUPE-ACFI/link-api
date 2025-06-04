import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OpportunityCompany {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  opportunityId: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty({ enum: ['client', 'buyer', 'supplier', 'insurer', 'factor', 'central', 'introducer'] })
  role: 'client' | 'buyer' | 'supplier' | 'insurer' | 'factor' | 'central' | 'introducer';

  @ApiProperty()
  addedAt: Date;

  @ApiPropertyOptional({ enum: ['invited', 'confirmed', 'rejected'] })
  participationStatus?: 'invited' | 'confirmed' | 'rejected';

  @ApiPropertyOptional({ type: () => [String] })
  contactIds?: string[];
}
