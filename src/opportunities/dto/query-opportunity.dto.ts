import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryOpportunityDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 0))
  @IsNumber()
  @IsOptional()
  offset?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

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

  @ApiPropertyOptional({
    enum: ['factoring', 'reverse_factoring', 'credit_insurance'],
  })
  @IsOptional()
  @IsEnum(['factoring', 'reverse_factoring', 'credit_insurance'])
  type?: 'factoring' | 'reverse_factoring' | 'credit_insurance';
}
