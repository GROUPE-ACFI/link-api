import { Contact } from '@contacts/domain/contact';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

export abstract class ContactRepository {
  abstract create(data: Omit<Contact, 'id'>): Promise<Contact>;

  abstract findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Contact[]>;

  abstract findById(id: Contact['id']): Promise<NullableType<Contact>>;

  abstract update(
    id: Contact['id'],
    payload: Partial<Omit<Contact, 'id'>>,
  ): Promise<Contact | null>;

  abstract remove(id: Contact['id']): Promise<void>;
}
