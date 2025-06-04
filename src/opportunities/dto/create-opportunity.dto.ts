import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OpportunityCompanyDto } from './opportunity-company.dto';
import { OpportunityLineDto } from './opportunity-line.dto';

export class CreateOpportunityDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ['factoring', 'reverse_factoring', 'credit_insurance'] })
  @IsEnum(['factoring', 'reverse_factoring', 'credit_insurance'])
  type: 'factoring' | 'reverse_factoring' | 'credit_insurance';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  totalEstimatedAmount?: number;

  @ApiPropertyOptional({ type: () => [OpportunityCompanyDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpportunityCompanyDto)
  participants?: OpportunityCompanyDto[];

  @ApiPropertyOptional({ type: () => [OpportunityLineDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpportunityLineDto)
  lines?: OpportunityLineDto[];
}
