import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  IsString,
  IsObject,
} from 'class-validator';
import { ContractProductType } from '@contract-products/domain/contract-product';

export class CreateContractProductDto {
  @ApiProperty({ type: String })
  @IsUUID()
  contractId: string;

  @ApiProperty({ enum: ContractProductType, enumName: 'ContractProductType' })
  @IsEnum(ContractProductType)
  productType: ContractProductType;

  @ApiProperty()
  @IsNumber()
  limitAmount: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNumber()
  feesPercentage: number;

  @ApiProperty({ required: false, type: Object })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
