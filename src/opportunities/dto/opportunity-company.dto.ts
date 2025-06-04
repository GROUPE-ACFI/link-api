import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class OpportunityCompanyDto {
  @ApiProperty()
  @IsString()
  companyId: string;

  @ApiProperty({ enum: ['client', 'buyer', 'supplier', 'insurer', 'factor', 'central', 'introducer'] })
  @IsEnum(['client', 'buyer', 'supplier', 'insurer', 'factor', 'central', 'introducer'])
  role: 'client' | 'buyer' | 'supplier' | 'insurer' | 'factor' | 'central' | 'introducer';

  @ApiPropertyOptional({ enum: ['invited', 'confirmed', 'rejected'] })
  @IsOptional()
  @IsEnum(['invited', 'confirmed', 'rejected'])
  participationStatus?: 'invited' | 'confirmed' | 'rejected';

  @ApiPropertyOptional({ type: () => [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  contactIds?: string[];
}
