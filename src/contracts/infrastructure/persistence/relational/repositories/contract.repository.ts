import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractRepository } from '@contracts/infrastructure/persistence/contract.repository';
import { ContractEntity } from '@contracts/infrastructure/persistence/relational/entities/contract.entity';
import { Contract } from '@contracts/domain/contract';
import { ContractMapper } from '@contracts/infrastructure/persistence/relational/mappers/contract.mapper';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class ContractsRelationalRepository implements ContractRepository {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly repository: Repository<ContractEntity>,
  ) {}

  async create(
    data: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Contract> {
    const entity = await this.repository.save(
      this.repository.create(ContractMapper.toPersistence(data as Contract)),
    );
    return ContractMapper.toDomain(entity);
  }

  async findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Contract[]> {
    const entities = await this.repository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    return entities.map((e) => ContractMapper.toDomain(e));
  }

  async findById(id: Contract['id']): Promise<NullableType<Contract>> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? ContractMapper.toDomain(entity) : null;
  }

  async update(
    id: Contract['id'],
    payload: Partial<Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Contract | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    const domain = ContractMapper.toDomain(entity);
    const updatedDomain: Contract = { ...domain, ...payload } as Contract;
    const updated = await this.repository.save(
      this.repository.create(ContractMapper.toPersistence(updatedDomain)),
    );
    return ContractMapper.toDomain(updated);
  }

  async remove(id: Contract['id']): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
