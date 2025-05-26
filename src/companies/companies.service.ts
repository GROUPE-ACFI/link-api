import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './infrastructure/persistence/company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './domain/company';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';
import { Address } from './domain/address';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly repository: CompanyRepository) {}

  async create(dto: CreateCompanyDto): Promise<Company> {
    const payload: Omit<Company, 'id'> = {
      name: dto.name,
      legalForm: dto.legalForm,
      siren: dto.siren,
      siret: dto.siret,
      tvaNumber: dto.tvaNumber,
      creationDate: dto.creationDate,
      isActive: dto.isActive,
      email: dto.email,
      phone: dto.phone,
      website: dto.website,
      addresses: this.mapAddresses(dto.addresses),
    };

    return this.repository.create(payload);
  }

  findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Company[]> {
    return this.repository.findManyWithPagination(options);
  }

  findById(id: Company['id']): Promise<NullableType<Company>> {
    return this.repository.findById(id);
  }

  async update(
    id: Company['id'],
    dto: UpdateCompanyDto,
  ): Promise<Company | null> {
    const payload: Partial<Omit<Company, 'id'>> = {
      ...dto,
      addresses: dto.addresses ? this.mapAddresses(dto.addresses) : undefined,
    };
    return this.repository.update(id, payload);
  }

  remove(id: Company['id']): Promise<void> {
    return this.repository.remove(id);
  }

  private mapAddresses(dtos?: AddressDto[]): Address[] | null {
    if (!dtos || dtos.length === 0) {
      return null;
    }

    return dtos.map((dto) => {
      const address = new Address();

      address.street = dto.street;
      address.postalCode = dto.postalCode;
      address.city = dto.city;
      address.country = dto.country;

      if (dto.id) {
        address.id = dto.id;
      }

      return address;
    });
  }
}
