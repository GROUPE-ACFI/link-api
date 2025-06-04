import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class OpportunityLineDto {
  @ApiProperty({ enum: ['ReverseFactoringLine', 'FactoringLine', 'CreditInsuranceLine'] })
  @IsEnum(['ReverseFactoringLine', 'FactoringLine', 'CreditInsuranceLine'])
  _type: 'ReverseFactoringLine' | 'FactoringLine' | 'CreditInsuranceLine';

  @ApiProperty()
  @IsString()
  @IsOptional()
  buyerId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  supplierId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  factorId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  insurerId?: string;
}
