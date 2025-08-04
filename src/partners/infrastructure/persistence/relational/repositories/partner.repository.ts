import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerRepository } from '@partners/infrastructure/persistence/partner.repository';
import { PartnerEntity } from '@partners/infrastructure/persistence/relational/entities/partner.entity';
import { Partner } from '@partners/domain/partner';
import { PartnerMapper } from '@partners/infrastructure/persistence/relational/mappers/partner.mapper';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class PartnersRelationalRepository implements PartnerRepository {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly repository: Repository<PartnerEntity>,
  ) {}

  async create(
    data: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Partner> {
    const entity = await this.repository.save(
      this.repository.create(PartnerMapper.toPersistence(data as Partner)),
    );
    return PartnerMapper.toDomain(entity);
  }

  async findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Partner[]> {
    const entities = await this.repository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    return entities.map((e) => PartnerMapper.toDomain(e));
  }

  async findById(id: Partner['id']): Promise<NullableType<Partner>> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? PartnerMapper.toDomain(entity) : null;
  }

  async update(
    id: Partner['id'],
    payload: Partial<Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Partner | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    const domain = PartnerMapper.toDomain(entity);
    const updatedDomain: Partner = { ...domain, ...payload } as Partner;
    const updated = await this.repository.save(
      this.repository.create(PartnerMapper.toPersistence(updatedDomain)),
    );
    return PartnerMapper.toDomain(updated);
  }

  async remove(id: Partner['id']): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
