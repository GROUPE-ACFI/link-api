import { Partner } from '@partners/domain/partner';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

export abstract class PartnerRepository {
  abstract create(
    data: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Partner>;

  abstract findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Partner[]>;

  abstract findById(id: Partner['id']): Promise<NullableType<Partner>>;

  abstract update(
    id: Partner['id'],
    payload: Partial<Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Partner | null>;

  abstract remove(id: Partner['id']): Promise<void>;
}
