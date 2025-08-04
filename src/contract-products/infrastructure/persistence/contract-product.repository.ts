import { ContractProduct } from '@contract-products/domain/contract-product';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

export abstract class ContractProductRepository {
  abstract create(
    data: Omit<ContractProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ContractProduct>;

  abstract findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<ContractProduct[]>;

  abstract findById(
    id: ContractProduct['id'],
  ): Promise<NullableType<ContractProduct>>;

  abstract update(
    id: ContractProduct['id'],
    payload: Partial<Omit<ContractProduct, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ContractProduct | null>;

  abstract remove(id: ContractProduct['id']): Promise<void>;
}
