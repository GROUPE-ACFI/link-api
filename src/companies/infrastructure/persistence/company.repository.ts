import { NullableType } from '@utils/types/nullable.type';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { Company } from '@companies/domain/company';

export abstract class CompanyRepository {
  abstract create(data: Omit<Company, 'id'>): Promise<Company>;

  abstract findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Company[]>;

  abstract findById(id: Company['id']): Promise<NullableType<Company>>;

  abstract update(
    id: Company['id'],
    payload: Partial<Omit<Company, 'id'>>,
  ): Promise<Company | null>;

  abstract remove(id: Company['id']): Promise<void>;
}
