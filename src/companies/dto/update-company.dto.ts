import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiPropertyOptional({ type: () => [AddressDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses?: AddressDto[];
}
