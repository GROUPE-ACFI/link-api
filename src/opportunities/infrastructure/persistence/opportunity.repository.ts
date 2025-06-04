import { Opportunity } from '@opportunities/domain/opportunity';
import { QueryOpportunityDto } from '@opportunities/dto/query-opportunity.dto';
import { NullableType } from '@utils/types/nullable.type';

export abstract class OpportunityRepository {
  abstract create(data: Omit<Opportunity, 'id'>): Promise<Opportunity>;

  abstract findAll(
    query: QueryOpportunityDto,
  ): Promise<[Opportunity[], number]>;

  abstract findById(id: Opportunity['id']): Promise<NullableType<Opportunity>>;

  abstract update(
    id: Opportunity['id'],
    payload: Partial<Omit<Opportunity, 'id'>>,
  ): Promise<Opportunity | null>;

  abstract remove(id: Opportunity['id']): Promise<void>;
}
