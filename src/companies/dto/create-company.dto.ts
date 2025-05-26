import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  legalForm: string;

  @ApiProperty({ example: '123456789' })
  @Matches(/^\d{9}$/)
  siren: string;

  @ApiProperty({ example: '12345678901234' })
  @Matches(/^\d{14}$/)
  siret: string;

  @ApiProperty({ example: 'FRXX999999999' })
  @Matches(/^FR[A-Z0-9]{2}\d{9}$/)
  tvaNumber: string;

  @ApiProperty()
  @IsDateString()
  creationDate: Date;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({ type: () => [AddressDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses?: AddressDto[];
}
