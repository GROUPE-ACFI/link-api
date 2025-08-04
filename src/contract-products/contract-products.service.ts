import { Injectable } from '@nestjs/common';
import { ContractProductRepository } from '@contract-products/infrastructure/persistence/contract-product.repository';
import { CreateContractProductDto } from '@contract-products/dto/create-contract-product.dto';
import { UpdateContractProductDto } from '@contract-products/dto/update-contract-product.dto';
import { ContractProduct } from '@contract-products/domain/contract-product';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class ContractProductsService {
  constructor(private readonly repository: ContractProductRepository) {}

  create(dto: CreateContractProductDto): Promise<ContractProduct> {
    const payload: Omit<ContractProduct, 'id' | 'createdAt' | 'updatedAt'> = {
      contractId: dto.contractId,
      productType: dto.productType,
      limitAmount: dto.limitAmount,
      currency: dto.currency,
      feesPercentage: dto.feesPercentage,
      metadata: dto.metadata,
    };
    return this.repository.create(payload);
  }

  findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<ContractProduct[]> {
    return this.repository.findManyWithPagination(options);
  }

  findById(id: ContractProduct['id']): Promise<NullableType<ContractProduct>> {
    return this.repository.findById(id);
  }

  update(
    id: ContractProduct['id'],
    dto: UpdateContractProductDto,
  ): Promise<ContractProduct | null> {
    const payload: Partial<
      Omit<ContractProduct, 'id' | 'createdAt' | 'updatedAt'>
    > = {
      ...dto,
    };
    return this.repository.update(id, payload);
  }

  remove(id: ContractProduct['id']): Promise<void> {
    return this.repository.remove(id);
  }
}
