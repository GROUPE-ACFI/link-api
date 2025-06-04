import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateContactDto } from '@contacts/dto/create-contact.dto';
import { IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyDto } from '@contacts/dto/company.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @ApiPropertyOptional({ type: () => [CompanyDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyDto)
  companies?: CompanyDto[];
}
