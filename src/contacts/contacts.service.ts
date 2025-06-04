import { Injectable } from '@nestjs/common';
import { ContactRepository } from '@contacts/infrastructure/persistence/contact.repository';
import { CreateContactDto } from '@contacts/dto/create-contact.dto';
import { UpdateContactDto } from '@contacts/dto/update-contact.dto';
import { Contact } from '@contacts/domain/contact';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';
import { Company } from '@companies/domain/company';
import { CompanyDto } from '@contacts/dto/company.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly repository: ContactRepository) {}

  async create(dto: CreateContactDto): Promise<Contact> {
    const payload: Omit<Contact, 'id'> = {
      email: dto.email,
      phone: dto.phone,
      firstname: dto.firstname,
      lastname: dto.lastname,
      birthdate: dto.birthdate,
      job: dto.job,
      companies: this.mapCompanies(dto.companies),
    };

    return this.repository.create(payload);
  }

  findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Contact[]> {
    return this.repository.findManyWithPagination(options);
  }

  findById(id: Contact['id']): Promise<NullableType<Contact>> {
    return this.repository.findById(id);
  }

  async update(
    id: Contact['id'],
    dto: UpdateContactDto,
  ): Promise<Contact | null> {
    const payload: Partial<Omit<Contact, 'id'>> = {
      ...dto,
      companies: dto.companies ? this.mapCompanies(dto.companies) : undefined,
    };
    return this.repository.update(id, payload);
  }

  remove(id: Contact['id']): Promise<void> {
    return this.repository.remove(id);
  }

  private mapCompanies(dtos?: CompanyDto[]): Company[] | null {
    if (!dtos || dtos.length === 0) {
      return null;
    }

    return dtos.map((dto) => {
      const company = new Company();
      company.id = dto.id;
      return company;
    });
  }
}
