import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateOpportunityDto } from '@opportunities/dto/create-opportunity.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateOpportunityDto extends PartialType(CreateOpportunityDto) {
  @ApiPropertyOptional({
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
  @IsOptional()
  @IsEnum([
    'draft',
    'in_progress',
    'proposal_sent',
    'won',
    'lost',
    'active',
    'closed',
  ])
  status?:
    | 'draft'
    | 'in_progress'
    | 'proposal_sent'
    | 'won'
    | 'lost'
    | 'active'
    | 'closed';
}
