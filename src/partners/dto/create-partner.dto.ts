import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { PartnerType } from '@partners/domain/partner';

export class CreatePartnerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: PartnerType, enumName: 'PartnerType' })
  @IsEnum(PartnerType)
  type: PartnerType;

  @ApiProperty({ required: false, type: Object })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}
