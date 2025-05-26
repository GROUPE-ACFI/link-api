import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './infrastructure/persistence/company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './domain/company';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class CompaniesService {
  constructor(private readonly repository: CompanyRepository) {}

  create(dto: CreateCompanyDto): Promise<Company> {
    return this.repository.create({ ...dto });
  }

  findManyWithPagination(options: { paginationOptions: IPaginationOptions }): Promise<Company[]> {
    return this.repository.findManyWithPagination(options);
  }

  findById(id: Company['id']): Promise<NullableType<Company>> {
    return this.repository.findById(id);
  }

  update(id: Company['id'], dto: UpdateCompanyDto): Promise<Company | null> {
    return this.repository.update(id, { ...dto });
  }

  remove(id: Company['id']): Promise<void> {
    return this.repository.remove(id);
  }
}
