import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateContactDto } from './create-contact.dto';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyDto } from './company.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiPropertyOptional({ type: () => [CompanyDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyDto)
  companies?: CompanyDto[];
}
