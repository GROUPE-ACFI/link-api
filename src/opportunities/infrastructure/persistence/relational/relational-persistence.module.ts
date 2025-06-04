import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityEntity } from './entities/opportunity.entity';
import { OpportunityCompanyEntity } from './entities/opportunity-company.entity';
import { OpportunityLineEntity } from './entities/opportunity-line.entity';
import { CommissionEntity } from './entities/commission.entity';
import { OpportunityRepository } from '../opportunity.repository';
import { OpportunitiesRelationalRepository } from './repositories/opportunity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OpportunityEntity, OpportunityCompanyEntity, OpportunityLineEntity, CommissionEntity])],
  providers: [
    {
      provide: OpportunityRepository,
      useClass: OpportunitiesRelationalRepository,
    },
  ],
  exports: [OpportunityRepository],
})
export class RelationalOpportunityPersistenceModule {}
