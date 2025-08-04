import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ContractStatus } from '@contracts/domain/contract';

export class CreateContractDto {
  @ApiProperty({ type: String })
  @IsUUID()
  companyId: string;

  @ApiProperty({ type: String })
  @IsUUID()
  partnerId: string;

  @ApiProperty({ enum: ContractStatus, enumName: 'ContractStatus' })
  @IsEnum(ContractStatus)
  status: ContractStatus;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsUUID()
  originalOpportunityId?: string;
}
