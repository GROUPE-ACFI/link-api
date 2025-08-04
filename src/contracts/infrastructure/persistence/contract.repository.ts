import { Contract } from '@contracts/domain/contract';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

export abstract class ContractRepository {
  abstract create(
    data: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Contract>;

  abstract findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Contract[]>;

  abstract findById(id: Contract['id']): Promise<NullableType<Contract>>;

  abstract update(
    id: Contract['id'],
    payload: Partial<Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Contract | null>;

  abstract remove(id: Contract['id']): Promise<void>;
}
