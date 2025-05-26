import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyRepository } from '../../company.repository';
import { CompanyEntity } from '../entities/company.entity';
import { Company } from '../../../domain/company';
import { CompanyMapper } from '../mappers/company.mapper';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { NullableType } from '../../../../utils/types/nullable.type';

@Injectable()
export class CompaniesRelationalRepository implements CompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly repository: Repository<CompanyEntity>,
  ) {}

  async create(data: Omit<Company, 'id'>): Promise<Company> {
    const entity = await this.repository.save(
      this.repository.create(CompanyMapper.toPersistence(data as Company)),
    );
    return CompanyMapper.toDomain(entity);
  }

  async findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Company[]> {
    const entities = await this.repository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    return entities.map((e) => CompanyMapper.toDomain(e));
  }

  async findById(id: Company['id']): Promise<NullableType<Company>> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? CompanyMapper.toDomain(entity) : null;
  }

  async update(
    id: Company['id'],
    payload: Partial<Omit<Company, 'id'>>,
  ): Promise<Company | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    const domain = CompanyMapper.toDomain(entity);
    const updatedDomain: Company = { ...domain, ...payload } as Company;
    const updated = await this.repository.save(
      this.repository.create(CompanyMapper.toPersistence(updatedDomain)),
    );
    return CompanyMapper.toDomain(updated);
  }

  async remove(id: Company['id']): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
