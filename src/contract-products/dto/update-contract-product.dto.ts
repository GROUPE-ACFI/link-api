import { PartialType } from '@nestjs/swagger';
import { CreateContractProductDto } from '@contract-products/dto/create-contract-product.dto';

export class UpdateContractProductDto extends PartialType(
  CreateContractProductDto,
) {}
