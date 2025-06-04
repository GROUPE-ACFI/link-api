import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityEntity } from '@opportunities/infrastructure/persistence/relational/entities/opportunity.entity';
import { OpportunityCompanyEntity } from '@opportunities/infrastructure/persistence/relational/entities/opportunity-company.entity';
import { OpportunityLineEntity } from '@opportunities/infrastructure/persistence/relational/entities/opportunity-line.entity';
import { CommissionEntity } from '@opportunities/infrastructure/persistence/relational/entities/commission.entity';
import { OpportunityRepository } from '@opportunities/infrastructure/persistence/opportunity.repository';
import { OpportunitiesRelationalRepository } from '@opportunities/infrastructure/persistence/relational/repositories/opportunity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OpportunityEntity,
      OpportunityCompanyEntity,
      OpportunityLineEntity,
      CommissionEntity,
    ]),
  ],
  providers: [
    {
      provide: OpportunityRepository,
      useClass: OpportunitiesRelationalRepository,
    },
  ],
  exports: [OpportunityRepository],
})
export class RelationalOpportunityPersistenceModule {}
