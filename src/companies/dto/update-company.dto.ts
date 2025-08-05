import { PartialType, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddressDto } from './update-address.dto';

export class UpdateCompanyDto extends PartialType(
  OmitType(CreateCompanyDto, ['addresses'] as const),
) {
  @ApiPropertyOptional({ type: () => [UpdateAddressDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  addresses?: UpdateAddressDto[];
}
