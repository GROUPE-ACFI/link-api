import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpportunityRepository } from '../../opportunity.repository';
import { OpportunityEntity } from '../entities/opportunity.entity';
import { Opportunity } from '@opportunities/domain/opportunity';
import { OpportunityMapper } from '../mappers/opportunity.mapper';
import { QueryOpportunityDto } from '@opportunities/dto/query-opportunity.dto';

@Injectable()
export class OpportunitiesRelationalRepository implements OpportunityRepository {
  constructor(
    @InjectRepository(OpportunityEntity)
    private readonly repository: Repository<OpportunityEntity>,
  ) {}

  async create(data: Omit<Opportunity, 'id'>): Promise<Opportunity> {
    const entity = await this.repository.save(
      this.repository.create(OpportunityMapper.toPersistence(data as Opportunity)),
    );
    return OpportunityMapper.toDomain(entity);
  }

  async findAll(query: QueryOpportunityDto): Promise<[Opportunity[], number]> {
    const qb = this.repository.createQueryBuilder('o');
    if (query.status) qb.andWhere('o.status = :status', { status: query.status });
    if (query.type) qb.andWhere('o.type = :type', { type: query.type });
    if (query.search)
      qb.andWhere('LOWER(o.name) LIKE :search', { search: `%${query.search.toLowerCase()}%` });
    qb.skip(query.offset ?? 0).take(query.limit ?? 10);
    const [entities, count] = await qb.getManyAndCount();
    return [entities.map((e) => OpportunityMapper.toDomain(e)), count];
  }

  async findById(id: Opportunity['id']): Promise<Opportunity | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? OpportunityMapper.toDomain(entity) : null;
  }

  async update(
    id: Opportunity['id'],
    payload: Partial<Omit<Opportunity, 'id'>>,
  ): Promise<Opportunity | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    const domain = OpportunityMapper.toDomain(entity);
    const updatedDomain: Opportunity = { ...domain, ...payload } as Opportunity;
    const updated = await this.repository.save(
      this.repository.create(OpportunityMapper.toPersistence(updatedDomain)),
    );
    return OpportunityMapper.toDomain(updated);
  }

  async remove(id: Opportunity['id']): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
