import { PartialType } from '@nestjs/swagger';
import { CreateContractDto } from '@contracts/dto/create-contract.dto';

export class UpdateContractDto extends PartialType(CreateContractDto) {}
