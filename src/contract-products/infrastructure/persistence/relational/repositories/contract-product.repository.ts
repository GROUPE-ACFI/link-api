import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractProductRepository } from '@contract-products/infrastructure/persistence/contract-product.repository';
import { ContractProductEntity } from '@contract-products/infrastructure/persistence/relational/entities/contract-product.entity';
import { ContractProduct } from '@contract-products/domain/contract-product';
import { ContractProductMapper } from '@contract-products/infrastructure/persistence/relational/mappers/contract-product.mapper';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class ContractProductsRelationalRepository
  implements ContractProductRepository
{
  constructor(
    @InjectRepository(ContractProductEntity)
    private readonly repository: Repository<ContractProductEntity>,
  ) {}

  async create(
    data: Omit<ContractProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ContractProduct> {
    const entity = await this.repository.save(
      this.repository.create(
        ContractProductMapper.toPersistence(data as ContractProduct),
      ),
    );
    return ContractProductMapper.toDomain(entity);
  }

  async findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ContractProduct[]> {
    const entities = await this.repository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    return entities.map((e) => ContractProductMapper.toDomain(e));
  }

  async findById(
    id: ContractProduct['id'],
  ): Promise<NullableType<ContractProduct>> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? ContractProductMapper.toDomain(entity) : null;
  }

  async update(
    id: ContractProduct['id'],
    payload: Partial<Omit<ContractProduct, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ContractProduct | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    const domain = ContractProductMapper.toDomain(entity);
    const updatedDomain: ContractProduct = {
      ...domain,
      ...payload,
    } as ContractProduct;
    const updated = await this.repository.save(
      this.repository.create(
        ContractProductMapper.toPersistence(updatedDomain),
      ),
    );
    return ContractProductMapper.toDomain(updated);
  }

  async remove(id: ContractProduct['id']): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
