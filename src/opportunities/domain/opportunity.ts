import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OpportunityCompany } from '@opportunities/domain/opportunity-company';
import { OpLine } from '@opportunities/domain/op-line';
import { Commission } from '@opportunities/domain/commission';

export class Opportunity {
  @ApiProperty({ type: String, example: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: ['factoring', 'reverse_factoring', 'credit_insurance'] })
  type: 'factoring' | 'reverse_factoring' | 'credit_insurance';

  @ApiProperty({
    enum: [
      'draft',
      'in_progress',
      'proposal_sent',
      'won',
      'lost',
      'active',
      'closed',
    ],
  })
  status:
    | 'draft'
    | 'in_progress'
    | 'proposal_sent'
    | 'won'
    | 'lost'
    | 'active'
    | 'closed';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  signedAt?: Date;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  totalEstimatedAmount?: number;

  @ApiProperty({ type: () => [OpportunityCompany] })
  participants: OpportunityCompany[];

  @ApiProperty({ type: () => [Object] })
  lines: OpLine[];

  @ApiProperty({ type: () => [Commission] })
  commissions: Commission[];
}
